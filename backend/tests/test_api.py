import pytest
from fastapi.testclient import TestClient
import sys
import os
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent.parent
sys.path.insert(0, str(backend_path))

from app.main import app
from app.database import init_db, get_db_connection

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "Electronic Appliance Disposal System" in data["message"]

def test_get_centres():
    response = client.get("/centres")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    # Should have sample centres
    assert len(data) > 0
    # Check structure
    centre = data[0]
    assert "name" in centre
    assert "city_area" in centre
    assert "address" in centre
    # Check demonstration label
    assert "Demo" in centre["name"] or "Demonstration" in centre["address"]

def test_get_centres_filter_by_city():
    response = client.get("/centres?city_area=Mumbai")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_create_disposal_request_valid():
    request_data = {
        "name": "John Doe",
        "appliance_type": "Laptop",
        "appliance_condition": "working",
        "quantity": 1,
        "city_area": "Mumbai"
    }
    response = client.post("/requests", json=request_data)
    assert response.status_code == 200
    data = response.json()
    assert data["appliance_type"] == "Laptop"
    assert data["appliance_condition"] == "working"
    assert data["quantity"] == 1
    assert "guidance" in data
    assert "reuse" in data["guidance"].lower() or "donation" in data["guidance"].lower()

def test_create_disposal_request_broken():
    request_data = {
        "appliance_type": "Old Mobile Phone",
        "appliance_condition": "broken",
        "quantity": 2,
        "city_area": "Delhi"
    }
    response = client.post("/requests", json=request_data)
    assert response.status_code == 200
    data = response.json()
    assert data["appliance_condition"] == "broken"
    assert "guidance" in data
    assert "recycl" in data["guidance"].lower()

def test_create_disposal_request_no_name():
    request_data = {
        "appliance_type": "Television",
        "appliance_condition": "broken",
        "quantity": 1,
        "city_area": "Bangalore"
    }
    response = client.post("/requests", json=request_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] is None or data["name"] == ""

def test_create_disposal_request_invalid_condition():
    request_data = {
        "appliance_type": "Laptop",
        "appliance_condition": "damaged",  # invalid
        "quantity": 1,
        "city_area": "Mumbai"
    }
    response = client.post("/requests", json=request_data)
    assert response.status_code == 422  # Validation error

def test_create_disposal_request_invalid_quantity():
    request_data = {
        "appliance_type": "Laptop",
        "appliance_condition": "working",
        "quantity": 0,  # invalid
        "city_area": "Mumbai"
    }
    response = client.post("/requests", json=request_data)
    assert response.status_code == 422

def test_get_requests():
    response = client.get("/requests")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_get_request_by_id():
    # First create a request
    request_data = {
        "appliance_type": "Microwave",
        "appliance_condition": "working",
        "quantity": 1,
        "city_area": "Pune"
    }
    create_response = client.post("/requests", json=request_data)
    assert create_response.status_code == 200
    created = create_response.json()
    
    # Get it by ID
    response = client.get(f"/requests/{created['id']}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == created["id"]
    assert data["appliance_type"] == "Microwave"

def test_get_nonexistent_request():
    response = client.get("/requests/99999")
    assert response.status_code == 404
