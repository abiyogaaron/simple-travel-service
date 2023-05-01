container_up_all:
	docker-compose up -d
mysql:
	docker-compose up -d mysql
redis:
	docker-compose up -d redis-master& docker-compose up -d redis-slave
createdb:
	cd server; echo "DIR > Server" && \
	npx sequelize db:create
dropdb:
	cd server; echo "DIR > Server" && \
	npx sequelize db:drop
migration_init:
	cd server; echo "DIR > Server" && \
	npx sequelize init:migrations
create_migration:
	cd server; echo "DIR > Server" && \
	npx sequelize migration:create --name $(name)
create_model:
	cd server; echo "DIR > Server" && \
	npx sequelize model:create --name ${name} --attributes ${attributes}
migrate_up:
	cd server; echo "DIR > Server" && \
	npm run compile& npx sequelize db:migrate --migrations-path './dist/db/migrations'
migrate_down:
	cd server; echo "DIR > Server" && \
	npm run compile& npx sequelize db:migrate:undo --name ${name} --migrations-path './dist/db/migrations'
migrate_down_all:
	cd server; echo "DIR > Server" && \
	npm run compile& npx sequelize db:migrate:undo:all --migrations-path './dist/db/migrations'
create_seeder:
	cd server; echo "DIR > Server" && \
	npx sequelize seed:create --name ${name}
seeder_up_all:
	cd server; echo "DIR > Server" && \
	npm run compile& npx sequelize db:seed:all --seeders-path './dist/db/seeders'
clear_redis:
	docker exec -it master redis-cli -a secret456 FLUSHALL
serve_http:
	http-server ./client/public -p 3001

.PHONY: mysql createdb dropdb migrate_up create_migration migration_init migrate_down_all create_seeder seeder_up_all