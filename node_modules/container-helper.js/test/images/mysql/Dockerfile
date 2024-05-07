FROM mysql:8.0-oracle
COPY sql/*.sql /docker-entrypoint-initdb.d/
COPY conf.d/custom.conf /etc/mysql/conf.d/custom.conf