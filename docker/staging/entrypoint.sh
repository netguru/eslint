#!/bin/bash
set -e

cd /var/www/app
# run startup script, like migrations

npm install

# run the CMD
exec "$@"
