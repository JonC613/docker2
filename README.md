# Docker-based Web Application

This project consists of a containerized web application with separate frontend and backend services managed with Docker Compose.

## Project Structure

- **Frontend**: React application served via Nginx
- **Backend**: Python Flask application with SQLite database
- **Docker Compose**: Orchestrates both services

## Features

- Item management API with CRUD operations
- React-based user interface
- Containerized deployment with Docker

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your system
- Node.js (for frontend development)
- Python (for backend development)

### Running the Application

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Rebuild containers if needed
docker-compose up --build
```

### Development

- **Frontend**: Located in the `/frontend` directory
  - React-based web application
  - Edit files in `/frontend/src` for UI changes
  
- **Backend**: Located in the `/backend` directory
  - Python application defined in `app.py`
  - Add dependencies to `requirements.txt`

## Configuration

- Frontend configuration: See `frontend/nginx.conf` for web server settings
- Backend configuration: Modify `backend/app.py` for API changes
