---
title: "DOCKER TIPS"
date: "2020-12-03"
---

#[DOCKER](https://www.docker.com/) TIPS

###IMAGES AND CONTAINERS
- `docker --help`  
- `docker images` list all images
- container is an instance of an image  
- `docker ps -a` list all containers  
- `docker run -it <image name> /bin/bash` pull the image and start the command line  
- `docker attach <container id>` similar as `docker exec -it < container-id > bash` just that it will stop the container when you exit (unless you use ctrl+p ctrl+q)  
---
- **create [Dockerfile](https://docs.docker.com/reference/)**:
    - `docker build .` builds image from docker conf file located in same folder
    - e.g. of simple Dockerfile:
```
FROM busybox:1.31.1  
EXPOSE 5000
ENTRYPOINT bin/bash
CMD ["nc" "-lv" "-p" "5000"]
```
-  `docker build -t myapp:0.0.1 .`
---
- `docker run -d <container name>` -d = detach 
- `docker inspect <container id>` check for the ip/network of container
- `docker run -d -P webapp` runs and binds random port to inside running app port (e.g. 8080)
- `docker run -d -p 3000:8080 webapp` runs and binds 3000 port to inside running app port (now we can do curl localhost:3000 and we should be able to get some response)

###NETWORKING
- `docker network ls` list running docker networks
- by default docker uses its own bridge network
- useful to pull ubuntu image and install following networking tools:
```
apt update && apt install -y arp-scan iputils-ping iproute2`
	- `ip addr show`
	- `arp-scan --interface=eth0 --localnet
```
- `docker inspet <container name>` gives us all the networking info ...
- `docker run -d --network=host <name of network> /webapp` runs in the same network as host 
- `docker run -d --network=none <name of network> ` runs with no network at all 

- Docker supports multiple network types. 
- The user-defined bridge network is ideal for connecting your containers when running on a single host. 
- Overlay networks would be preferred for multi-host container environments. 
- Containers in the same network can freely communicate with one another. 
- Containers inside a network are isolated from everything outside of the network unless the containers expose and publish a port.
- e.g.: 
    - `docker network create --driver=bridge app-net; docker run -d --name=app-db --net=app-net -p 27017:27017 mongo:3`
    
 

###MOUNTING/STORAGE
- there are 3 types of storage (bind, volume, tmpfs)
- `docker run -d --mount type=bind,src="<some path on host>",dst=<path inside container> <container name>`
- `docker run -d --mount type=volume,src="<some path on host - relative to docker root dir>",dst=<path inside container> <container name>`
- `docker run -d --mount type=tmpfs,dst=<path inside container> <container name>`

###TAGGING
- `docker tag <image name>:<tag version> <repository path/user>/<image name>:<tag version>` 
- `docker push <repository path/user>/<image name>:<tag version>`
- e.g.: `docker image tag alpine:3.12.0 alpine:challenge`

###OTHER USEFUL COMMANDS
- `docker logs <container name>` 
- container logs can be found under: /var/lib/docker/containers/<container id>/<container id>-json.log
    - or run: `docker inspect --format='{{.LogPath}}' $INSTANCE_ID`
- `docker exec -it <container name> /bin/bash` login into container -i = interactive, -t = show timestamps
- `docker exec <container> ls /etc/nginx` output will be list of files in docker container
- `docker search "Microsoft .NET Core"` or  https://hub.docker.com: 
- `docker run -d -p 3309:3306 mariadb:latest MYSQL_ALLOW_EMPTY_PASSWORD=yes`
- `docker run -it --name mariadb2 -e MYSQL_ALLOW_EMPTY_PASSWORD -d mariadb:latest`
- `docker rm [cid1 cid2 cid3 ...]`
- `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mariadb3`
- `docker run -i -t -e PROGRAM_ARGUMENTS=" --username=test --url=jdbc:mariadb://172.17.0.2:3306/test --logLevel=info " liquibase /bin/bash`
- `docker stop <container id>`
- `docker stop $(docker ps -aq)` stop all containers


- Save image locally and restore it on the server:
    - `docker save -o <path for generated tar file> <image name>`
    - `scp <to server>`
    - `docker load -i <path to image tar file>` to restore it 
    
- `docker rmi -f $(docker images -a -q)`

###[DOCKER COMPOSE](https://docs.docker.com/compose/)
- root elements 
	- version 
	- services 
	- volumes 
	- networks 
- shell variables are automatically imported into ${<some variable from shell>} #and there should be an `export <some variable from shell>`
- extension fields: 
	- root keys begging with `x-... &<key>`

###PRACTICAL EXAMPLE: CREATE WEB APP STACK WITH DOCKER
- `docker network create --driver=bridge app-net`
- `docker run -d --name=app-db --net=app-net -p 27017:27017 mongo:3`
- `NODE_ENV=development DEBUG=docker-software-delivery:* npm start`
- create a dockerfile
```
echo '
# Node.js version 6 base image
FROM node:6
# Production app runs on port 8080
EXPOSE 8080
# Set production mode and use app-db as the database host
ENV NODE_ENV=production DB_HOST=app-db 
# Copy source files into container
COPY ./src /app
# Set working directory to where source is
WORKDIR /app
# Install production dependencies and build app
RUN npm install --production && npm run build
# Start the server in production mode and use app-db as db host
CMD ["npm", "start"]
' > Dockerfile
```
- add files to .dockerignore
```
echo '
# Ignore node_modules directory
src/node_modules
' > .dockerignore
```
- `docker build -t accumulator:latest -t accumulator:1 -t accumulator:1.0 .`
- `docker run -p 80:8080 -d accumulator:1  --name=app --net=app-net`
- `docker logs app`
- `docker rm -f app-db`
- `docker run -d --name=app-db --net=app-net mongo:3`

###PRACTICAL EXAMPLE:CREATE LOCAL REGISTRY
- 
```bash
docker run -d --name registry \
           --restart=always \
           -v /certs:/certs \
           -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/cert.pem \
           -e REGISTRY_HTTP_TLS_KEY=/certs/key.pem \
           -p 5000:5000 \
           registry:2

docker tag accumulator registry.ca-labs.com:5000/accumulator:1
docker tag accumulator registry.ca-labs.com:5000/accumulator:1.0
docker tag accumulator registry.ca-labs.com:5000/accumulator:latest 
docker push registry.ca-labs.com:5000/accumulator:1
docker push registry.ca-labs.com:5000/accumulator:1.0
docker push registry.ca-labs.com:5000/accumulator:latest
  ```
- to see images in registry run in browser: https:// followed by the registry public IP address followed by :5000/v2/_catalog.
###PRACTICAL EXAMPLE: RUNNING IT  WITH DOCKER COMPOSE
```
echo '
# Docker Compose version 2
version: "2"
services:
  # application tier container
  app:
    # Use the version 1 image in the private registry
    image: <host server>:5000/accumulator:1
    ports:
      - "80:8080"
    # Ensure the app container starts after app-db
    depends_on:
      - app-db
  # database tier container
  app-db:
    image: mongo:3
' > docker-compose.yml
scp docker-compose.yml src/integration.sh <host server>:/home/student
ssh <host server>
docker-compose up -d
docker-compose ps 
docker-compose logs
```
###PRACTICAL EXAMPLE: RUNNING IT  WITH DOCKER COMPOSE OVERRIDE (PER ENV)
```
echo '
version: "2"
services:
  app:
    restart: always
  app-db:
    restart: always
    volumes:
      # mount volume for database files
      - /opt/data:/data/db
' > docker-compose.prod.yml
mkdir ~/.docker
sudo cp /certs/ca.pem \
        /certs/cert.pem \
        /certs/key.pem \
        ~/.docker
sudo chown student ~/.docker/*
chmod 400 ~/.docker/*
DOCKER_HOST=production.ca-labs.com:2376 DOCKER_TLS_VERIFY=true docker-compose \
    -f docker-compose.yml \
    -f docker-compose.prod.yml \
    up \
    -d
DOCKER_HOST=production.ca-labs.com:2376 DOCKER_TLS_VERIFY=true docker-compose ps
#UCP
- install it with:
docker container run --rm docker/ucp:3.3.0 install --help
https://docs.mirantis.com/docker-enterprise/v3.0/dockeree-products/ucp/admin/install-ucp.html#ports-used
docker container run --rm -it \
  --name ucp \
  -v /var/run/docker.sock:/var/run/docker.sock \
  docker/ucp:3.3.0 \
    install \
    --force-insecure-tcp \
    --san $fqdn \
    --pod-cidr "10.0.0.0/16" \
    --host-address 192.168.100.5 \
    --admin-username admin \
    --admin-password password
echo https://$fqdn
```
