HackYeah hackathon 2024 Kraków.

To run docker compose which will setup the postgres according to file docker/postgres/init/init.sql:

`sudo rm -rf docker/postgres/postgres_data || true && docker compose down -v && docker compose up`

Used software: 

Docker version 26.0.0
Docker Compose version v2.25.0
