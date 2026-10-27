import sqlite3
import os
from pathlib import Path

DB_PATH = Path(__file__).parent / "ewaste.db"

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create collection centres table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS collection_centres (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            city_area TEXT NOT NULL,
            address TEXT NOT NULL,
            phone TEXT,
            accepts_working INTEGER DEFAULT 1,
            accepts_broken INTEGER DEFAULT 1
        )
    ''')
    
    # Create disposal requests table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS disposal_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            appliance_type TEXT NOT NULL,
            appliance_condition TEXT NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 1,
            city_area TEXT NOT NULL,
            status TEXT DEFAULT 'submitted',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            guidance TEXT
        )
    ''')
    
    # Seed sample collection centres (clearly marked as demonstration)
    cursor.execute('SELECT COUNT(*) as count FROM collection_centres')
    if cursor.fetchone()['count'] == 0:
        sample_centres = [
            ("Demo GreenCycle Centre", "Mumbai", "Demo Address: Sector 12, Industrial Area (Demonstration Data)", "022-XXXX-1234", 1, 1),
            ("Demo EcoTech Recycling Hub", "Delhi", "Demo Address: Block C, Recycling Park (Demonstration Data)", "011-XXXX-5678", 1, 1),
            ("Demo EarthCare Collection Point", "Bangalore", "Demo Address: Tech Zone, Unit 5 (Demonstration Data)", "080-XXXX-9012", 1, 1),
            ("Demo Reuse First Depot", "Mumbai", "Demo Address: Community Center, Ward 8 (Demonstration Data)", "022-XXXX-3456", 1, 1),
            ("Demo SafeDispose Facility", "Pune", "Demo Address: Eco Park, Plot 7 (Demonstration Data)", "020-XXXX-7890", 1, 1),
        ]
        cursor.executemany('''
            INSERT INTO collection_centres (name, city_area, address, phone, accepts_working, accepts_broken)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', sample_centres)
    
    conn.commit()
    conn.close()
    print("Database initialized successfully")
