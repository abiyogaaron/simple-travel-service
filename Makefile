container_up_all:
	docker-compose up -d
mysql:
	docker-compose up -d mysql
redis:
	docker-compose up -d redis-master& docker-compose up -d redis-slave
createdb:
	npx sequelize db:create
dropdb:
	npx sequelize db:drop
migration_init:
	npx sequelize init:migrations
create_migration:
	npx sequelize migration:create --name $(name)
create_model:
	npx sequelize model:create --name ${name} --attributes ${attributes}
migrate_up:
	npm run compile& npx sequelize db:migrate --migrations-path './dist/db/migrations'
migrate_down:
	npm run compile& npx sequelize db:migrate:undo --name ${name} --migrations-path './dist/db/migrations'
migrate_down_all:
	npm run compile& npx sequelize db:migrate:undo:all --migrations-path './dist/db/migrations'
create_seeder:
	npx sequelize seed:create --name ${name}
seeder_up_all:
	npm run compile& npx sequelize db:seed:all --seeders-path './dist/db/seeders'

.PHONY: mysql createdb dropdb migrate_up create_migration migration_init migrate_down_all create_seeder seeder_up_all