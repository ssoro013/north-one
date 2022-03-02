# North-one coding challenge

# Description
The north-one take home challenge by @ssoro013

# Requirements
- Node
- Postgres

# Dependencies
- run `npm install` to install packages

# Database

#### Prerequesite: replace `username` and `password` in the database config (config/database.js) with your postgres username and password respectively and:

1. Run `npm run create:db` to create the database
2. Run `npm run migrate` to run migrations
2. Run `npm run seed` to seed the database

or

- Run `npm run db:set` to create, migrate, and seed the database

# Server
- Run `npm start` to start server on http://localhost:5000

# Tests
- Run `npm run test` to run unit tests

# Endpoints

## Users
- `POST /users`
```
  - curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"firstName": "John", "lastName": "Doe", "email": "john.doe@gmail.com"}' \
  'http://localhost:5000/users'
```

- `GET /users/:id/tasks/status`: 
```
    - curl http://localhost:5000/users/1/tasks/status?status=done
```

- `GET /users/:id/tasks/due`: 
```
    - curl http://localhost:5000/users/1/tasks/status?due?due_date=03-01-2022
```

## Tasks
- `POST /users/:id/tasks`:
```
  - curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"title": "tennis", "description": "tennis match on the weekend", "categories": ["sports"], "due": "2022-03-01 00:00:0"}' \
  'http://localhost:5000/users/1/tasks'
```

- `PUT /users/:id/tasks/:task_id`:
```
  - curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"title": "biking", "description": "weekend biking fun", "status": "on hold", "due": "2022-02-28 00:00:0"}' \
  'http://localhost:5000/users/1/tasks/1'
```

- `DELETE /users/:id/tasks/:task_id`:
```
  - curl --header "Content-Type: application/json" \
  --request DELETE \
  'http://localhost:5000/users/1/tasks/1'
```

- `PUT /tasks/:id/category`:
```
  - curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"category": "workout"}' \
  'http://localhost:5000/tasks/1/category'
```

- `PUT /tasks/:id/status`:
```
  - curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"status": "done"}' \
  'http://localhost:5000/tasks/1/status'
```

## Subtasks
- `POST /tasks/:id/subtasks`:
```
  - curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"title": "soccer", "description": "first soccer game of the weekend", "due": "2022-02-27 00:00:0", "category": ["sports"]}' \
  'http://localhost:5000/tasks/1/subtasks'
```

# Assumptions & Notes
- using console.log to log errors for simplicity (for a production app, i would probably use a proper monitoring tool like Splunk)
- database credentials (and other secrets) would be stored and retrieved from secret management tools like Vault