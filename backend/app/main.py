from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from typing import Optional, List
import sqlite3
from .database import get_db_connection, init_db

app = FastAPI(
    title="Electronic Appliance Disposal System API",
    description="API for managing e-waste disposal requests and collection centres",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_db()

# Pydantic models for validation
class DisposalRequestCreate(BaseModel):
    name: Optional[str] = None
    appliance_type: str
    appliance_condition: str
    quantity: int
    city_area: str
    
    @field_validator('appliance_type')
    @classmethod
    def validate_appliance_type(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Appliance type is required')
        return v.strip()
    
    @field_validator('appliance_condition')
    @classmethod
    def validate_appliance_condition(cls, v):
        valid_conditions = ['working', 'broken']
        if v.lower() not in valid_conditions:
            raise ValueError('Appliance condition must be either "working" or "broken"')
        return v.lower()
    
    @field_validator('quantity')
    @classmethod
    def validate_quantity(cls, v):
        if v < 1:
            raise ValueError('Quantity must be at least 1')
        if v > 100:
            raise ValueError('Quantity cannot exceed 100')
        return v
    
    @field_validator('city_area')
    @classmethod
    def validate_city_area(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('City/Area is required')
        return v.strip()

class CollectionCentre(BaseModel):
    id: int
    name: str
    city_area: str
    address: str
    phone: Optional[str]
    accepts_working: bool
    accepts_broken: bool

class DisposalRequest(BaseModel):
    id: int
    name: Optional[str]
    appliance_type: str
    appliance_condition: str
    quantity: int
    city_area: str
    status: str
    created_at: str
    guidance: Optional[str]

def generate_guidance(condition: str) -> str:
    if condition == 'working':
        return "This appliance appears to be in working condition. We recommend considering reuse or donation first. Check with local donation centres, schools, or NGOs that might accept working electronics. If donation isn't possible, you can still recycle through authorised e-waste recyclers."
    else:
        return "This appliance is broken/not working. It should be taken to an authorised e-waste recycling centre for proper disposal. Broken electronics contain hazardous materials and must not be disposed of in regular trash. Authorised recyclers will safely extract valuable materials and handle toxic components responsibly."

@app.get("/")
async def root():
    return {"message": "Electronic Appliance Disposal System API", "status": "running"}

@app.get("/centres", response_model=List[CollectionCentre])
async def get_collection_centres(city_area: Optional[str] = None):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if city_area:
        cursor.execute('SELECT * FROM collection_centres WHERE LOWER(city_area) LIKE LOWER(?)', (f'%{city_area}%',))
    else:
        cursor.execute('SELECT * FROM collection_centres')
    
    rows = cursor.fetchall()
    centres = []
    for row in rows:
        centres.append({
            "id": row['id'],
            "name": row['name'],
            "city_area": row['city_area'],
            "address": row['address'],
            "phone": row['phone'],
            "accepts_working": bool(row['accepts_working']),
            "accepts_broken": bool(row['accepts_broken'])
        })
    
    conn.close()
    return centres

@app.post("/requests", response_model=DisposalRequest)
async def create_disposal_request(request: DisposalRequestCreate):
    guidance = generate_guidance(request.appliance_condition)
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
            INSERT INTO disposal_requests (name, appliance_type, appliance_condition, quantity, city_area, guidance)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (request.name, request.appliance_type, request.appliance_condition, request.quantity, request.city_area, guidance))
        
        request_id = cursor.lastrowid
        conn.commit()
        
        cursor.execute('SELECT * FROM disposal_requests WHERE id = ?', (request_id,))
        row = cursor.fetchone()
        
        return {
            "id": row['id'],
            "name": row['name'],
            "appliance_type": row['appliance_type'],
            "appliance_condition": row['appliance_condition'],
            "quantity": row['quantity'],
            "city_area": row['city_area'],
            "status": row['status'],
            "created_at": row['created_at'],
            "guidance": row['guidance']
        }
    except sqlite3.Error as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        conn.close()

@app.get("/requests", response_model=List[DisposalRequest])
async def get_disposal_requests():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM disposal_requests ORDER BY created_at DESC')
    rows = cursor.fetchall()
    
    requests = []
    for row in rows:
        requests.append({
            "id": row['id'],
            "name": row['name'],
            "appliance_type": row['appliance_type'],
            "appliance_condition": row['appliance_condition'],
            "quantity": row['quantity'],
            "city_area": row['city_area'],
            "status": row['status'],
            "created_at": row['created_at'],
            "guidance": row['guidance']
        })
    
    conn.close()
    return requests

@app.get("/requests/{request_id}", response_model=DisposalRequest)
async def get_disposal_request(request_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM disposal_requests WHERE id = ?', (request_id,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        raise HTTPException(status_code=404, detail="Request not found")
    
    return {
        "id": row['id'],
        "name": row['name'],
        "appliance_type": row['appliance_type'],
        "appliance_condition": row['appliance_condition'],
        "quantity": row['quantity'],
        "city_area": row['city_area'],
        "status": row['status'],
        "created_at": row['created_at'],
        "guidance": row['guidance']
    }
