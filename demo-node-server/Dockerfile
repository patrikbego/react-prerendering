# Dockerfile
# base image
FROM node:alpine
# create & set working directory
RUN mkdir -p /next-node-server
WORKDIR /next-node-server
RUN pwd
# copy source files
RUN ls
COPY posts /next-node-server/posts
COPY . /next-node-server/
# install dependencies
RUN npm install
# start app
EXPOSE 8888
CMD node post-api.js
