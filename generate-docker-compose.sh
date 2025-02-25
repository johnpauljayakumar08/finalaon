#!/bin/bash

# Check if UserID is provided
if [ -z "$1" ]; then
  echo "Usage: ./generate-docker-compose.sh <user_id>"
  exit 1
fi

# Variables
UserID=$1
Port=$((8080 + UserID))

# Generate Docker Compose file content
composeContent=$(cat <<EOF
version: '3.8'

services:
  backend:
    image: krishnapriyap/aonbackend:latest
    ports:
      - "5000:5000"
    environment:
      - MYSQL_HOST=172.24.0.2
      - MYSQL_USER=root
      - MYSQL_ROOT_PASSWORD=rootpassword
      - MYSQL_DATABASE=testdb
      - MYSQL_ALLOW_EMPTY_PASSWORD=yes
    depends_on:
      - mysql
    networks:
      - my_network

  frontend:
    image: krishnapriyap/aonfrontend:latest
    ports:
      - "3001:3000"
    depends_on:
      - backend
    networks:
      - my_network

  mysql:
    image: krishnapriyap/mern-mysql:latest
    restart: always
    environment:
      MYSQL_HOST: mysql
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: testdb
      MYSQL_ALLOW_EMPTY_PASSWORD: yes
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - my_network

  code-server:
    image: krishnapriyap/aoncodeserver:latest
    environment:
      - PASSWORD=test
    ports:
      - "8081:8080"
    command: ["code-server", "--config", "/home/coder/.config/code-server/config.yaml"]
    networks:
      - my_network

networks:
  my_network:
    driver: bridge

volumes:
  mysql-data:
  user_workspace_${UserID}:
    driver: local
EOF
)

# Debug: Print the calculated port
echo "Calculated Port for UserID ${UserID}: ${Port}"

# Debug: Print the Docker Compose file content
echo "Docker Compose Content:"
echo "${composeContent}"

# Save the content to a Docker Compose file
composeFileName="docker-compose-user-${UserID}.yml"
echo "${composeContent}" > ${composeFileName}

# Run Docker Compose to start the containers
docker-compose -f ${composeFileName} up -d