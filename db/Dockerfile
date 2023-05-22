FROM postgres

ENV POSTGRES_PASSWORD=some_password
ENV POSTGRES_USER=some_user
ENV POSTGRES_DB=dev

ADD ./migration.sql /docker-entrypoint-initdb.d