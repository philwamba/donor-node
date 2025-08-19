#!/usr/bin/env bash

set -euo pipefail

# Start Postgres and Redis using the provided Docker Compose file
COMPOSE_FILE="$(dirname "$0")/../docker/docker-compose.dev.yml"

echo "Starting Postgres and Redis containers..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "Waiting for Postgres to be ready..."
until docker exec $(docker-compose -f "$COMPOSE_FILE" ps -q postgres) pg_isready -U postgres > /dev/null 2>&1; do
  sleep 1
done

echo "Databases are up.  You can now run migrations or seed data."