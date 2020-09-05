#!/bin/bash

cd /opt/api

# The entrypoint for the Postscript Homework API
./cmds/wait-for-it.sh db:5432 -s -- printf "Database Successfully Started\n"
python manage.py recreate_db
python manage.py db init
python manage.py db migrate
python manage.py db upgrade

# Execute main run command
exec "$@"
exit