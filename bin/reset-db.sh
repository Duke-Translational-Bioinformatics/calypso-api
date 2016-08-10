#!/bin/bash
echo "Dropping and recreating calypso_test"
psql -w -U postgres -c "DROP DATABASE calypso_test"
psql -w -U postgres -c "CREATE DATABASE calypso_test"
# psql -w -U postgres -c 'CREATE EXTENSION plv8'
# psql -w -U postgres -c 'CREATE EXTENSION plls'
# psql -w -U postgres -c 'CREATE EXTENSION plcoffee'
echo "Running through ../sql/run.sql"
<<<<<<< HEAD
cd ../sql
=======
cd sql
>>>>>>> 4afcd73c3a72862795df9d9a63d060531a7b8bee
while read sqlline
do
    psql -w -U postgres -d calypso_test -f "${sqlline}"
done < run.sql
