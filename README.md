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

## CI/CD Pipeline

We've implemented a GitHub Actions workflow to automate testing, building, and deployment processes:

### Steps Implemented

1. **Automated Testing**:
   - Backend tests using pytest
   - Frontend tests using Jest
   - Tests run automatically on pull requests and pushes to main/master branches

2. **Docker Image Building**:
   - Separate Docker images for frontend and backend
   - Images are built using Docker Buildx
   - Tagging with GitHub repository owner name

3. **Container Registry Integration**:
   - Images are pushed to GitHub Container Registry (ghcr.io)
   - Authentication using GitHub Actions tokens
   - Images tagged with latest version

4. **Continuous Deployment**:
   - Deployment process triggered only on pushes to main/master (not PRs)
   - Creates deployment status in GitHub
   - Links to packages and deployment logs

### How to Use the CI/CD Pipeline

1. **For Development**:
   - Make changes and push to a feature branch
   - Create a pull request to run tests automatically
   - Merge to main/master when ready for production

2. **For Deployment**:
   - Push to main/master branch to trigger full pipeline
   - Images will be built, pushed, and deployment status updated
   - Access deployed containers from GitHub Packages

3. **Monitoring Deployments**:
   - Check GitHub Actions tab for workflow status
   - Deployment history available in repository's Deployments section
   - Container images accessible via GitHub Packages
