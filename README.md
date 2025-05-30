 # Plant-Care Server API

Backend API for RykHub freelance task marketplace, built with Node.js, Express, and MongoDB.

## Features

- RESTful API endpoints for task management
- MongoDB database integration
- Secure CRUD operations
- Error handling and logging

## API Endpoints

### plants

| Method | Endpoint            | Description                          |
|--------|---------------------|--------------------------------------|
| GET    | `/plants`            | Get all plants 
| GET    | `/plants/newplants`   | Get 6 plants                 |
| GET    | `/my-plants`         | Get plants by user email              |
| POST   | `/plants`            | Create new task                      |
| PATCH  | `/plants/:id`        | Update plant by ID                    |
| DELETE | `/plants/:id`        | Delete plant by ID                    |

## Database Schema

 *Sample Data*
```bash
{
  _id: ObjectId,
  image: String,
  plantName: String,
  description: String,
  category: String,
  careLevel: String,
  wateringFrequency: String,
  lastWateredDate: Date,
  nextWateringDate: Date,
  healthStatus: String
  email: String
  
}

License
MIT
This README includes:
- Clear API documentation
- Environment setup
- Database schema
- Development commands
- Contribution guidelines

You can customize the badges, license, and deployment instructions based on your specific setup. The markdown formatting ensures proper display on GitHub.