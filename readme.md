# Simple-travel-service

## How to run the project ?

### Requirement
1. Docker (20.10.24)
2. Node (14.21.3)
3. MakeFile
4. MySql (5.7.41)
5. Redis (7.0.0)
6. React (18)
7. Typescript
8. Webpack (5)

### Setup
1. run `npm run install:all`
2. run `make container_up_all`
3. if you dont have the images in your docker then you need to rerun step 2
4. run `make createdb`
5. run `make migrate_up`
6. run `make seeder_up_all`

### Run the web app
1. run `npm run start:all` will start client and server in development mode 
2. open `localhost:3001` for the client app
3. open `localhost:3000` for the server app

### Build the web app
1. run `npm run build:{environment}:all` will build the web app in test environment
    - the environment is `development | test | production` 
2. the server build code will be located in /server/dist
3. the client build code will be located in /client/public

## Specifications
- using `mysql` as the main database
- using `redis` with 1 master and 1 replica for database caching
- using `typescript` as development languange
- using `swc (Rust Based)` as the compiler from `typescript` to `javascript`
- using `sequelize` as an ORM and as a db cli
- using `nodejs` as the runtime
- using `webpack` as the module bundler in the client side

## Server Routes
currently this project only have 3 routes
- `/api/users`
- `/api/flights`
- `/api/flight-reservations`


