# Contributing to Docker Web Application

Thank you for your interest in contributing to this project! Here are some guidelines to help you get started.

## Development Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and modify as needed
3. Start the development environment:
   ```bash
   docker-compose up
   ```

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Style Guidelines

- **Backend**: Follow PEP 8 style guidelines for Python code
- **Frontend**: Follow ESLint configuration for JavaScript code

## Testing

- Backend tests can be run with: `python -m pytest backend/test_app.py`
- Frontend tests can be run with: `cd frontend && npm test`

## License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT License.
