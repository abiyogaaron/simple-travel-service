mysql:
	docker-compose up -d simple-travel-service-db
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
	npx sequelize db:migrate
migrate_down:
	npx sequelize db:migrate:undo --name ${name}

.PHONY: mysql createdb dropdb migrate_up create_migration migration_init