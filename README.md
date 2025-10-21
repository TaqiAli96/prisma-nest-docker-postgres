# NestJS Docker Practice

A complete NestJS application with PostgreSQL, Prisma, and Docker containerization.

## Features

- 🚀 NestJS framework
- 🐘 PostgreSQL database
- 🔧 Prisma ORM
- 🐳 Docker containerization
- 📦 Docker Compose orchestration

## Project Structure

```
├── src/
│   ├── prisma/          # Prisma service and module
│   ├── users/           # User module (CRUD operations)
│   ├── posts/           # Post module (CRUD operations)
│   ├── app.module.ts    # Main application module
│   └── main.ts          # Application entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeding
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose services
└── package.json
```

## Quick Start

### 1. Clone and Setup

```bash
# Copy environment file
cp env.example .env

# Install dependencies
npm install
```

### 2. Using Docker Compose (Recommended)

```bash
# Start all services (PostgreSQL + NestJS)
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database
npx prisma db seed
```

### 4. Development Mode

```bash
# Start development version
docker-compose up app-dev

# Or run locally (requires PostgreSQL running)
npm run start:dev
```

## API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Posts
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get post by ID
- `POST /posts` - Create post
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

## Docker Commands

```bash
# Build the application
docker build -t nest-app .

# Run the application
docker run -p 3000:3000 nest-app

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Remove volumes (clean database)
docker-compose down -v
```

## Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/nestdb?schema=public"
PORT=3000
NODE_ENV=development
```

## Database Schema

- **User**: id, email, name, createdAt, updatedAt
- **Post**: id, title, content, published, createdAt, updatedAt, authorId

## Development

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start development server
npm run start:dev

# Run tests
npm test
```

## Production

The Docker setup includes:
- Multi-stage build for optimization
- PostgreSQL database with persistent storage
- Environment-based configuration
- Health checks and restart policies
