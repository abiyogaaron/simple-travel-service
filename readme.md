# Simple-travel-service using node - typescript

### Requirement
1. Docker (20.10.24)
2. Node (14.21.3)
3. MakeFile
4. MySql (5.7.41)
5. Redis (7.0.0)

## How to run the project ?

### Setup
1. run `npm install`
2. run `make container_up_all`
3. if you dont have the images in your docker then you need to rerun step 2
4. run `make createdb`
5. run `make migrate_up`
6. run `make seeder_up_all`

### Run Server
1. run `npm run dev` for running development mode
2. open `localhost:3000`

## Specifications
- using `redis` with 1 master and 1 replica
- using `typescript` as development languange
- using `swc (Rust Based)` as the compiler from `typescript` to `javascript`
- using `sequelize` as an ORM and as a db cli

## Routes
currently this project only have 2 routes
- `/api/users`
- `/api/flights`


