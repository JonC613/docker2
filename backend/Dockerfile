FROM python:3.9-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the API code
COPY app.py .

# Expose the API port
EXPOSE 5000

# Run the API server
CMD ["python", "app.py"]
