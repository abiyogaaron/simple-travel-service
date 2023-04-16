# Simple-travel-service using node - typescript

### Requirement
1. Docker (20.10.24)
2. Node (14.21.3)
3. MakeFile
4. MySql (5.7.41)

## How to run the project ?

### Setup
1. run `npm install`
2. run `make mysql`
3. if you dont have the mysql:5.7.41 image in your docker then you need to rerun step 2
4. run `make createdb`
5. run `make migrate_up`
6. run `make seeder_up_all`

### Run Server
1. run `npm run dev` for running development mode
2. open `localhost:3000`


