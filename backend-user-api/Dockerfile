
# statements lookups here:
# https://docs.docker.com/engine/reference/builder/

# The FROM instruction initializes a new build stage and sets the Base Image for subsequent instructions. As such, a valid Dockerfile must start with a FROM instruction.
# FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]

FROM node:12

# create app directory
WORKDIR /usr/src/app

# install app dependencies

COPY package*.json ./

# install with "clean slate" https://docs.npmjs.com/cli/ci.html
RUN npm ci

# copy and build
# The COPY instruction copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>.
COPY . .

# The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime.
# You can specify whether the port listens on TCP or UDP, and the default is TCP if the protocol is not specified.
EXPOSE 8080

# Both CMD and ENTRYPOINT instructions define what command gets executed when running a container. Some rules:
# Dockerfile should specify at least one of CMD or ENTRYPOINT commands.
# ENTRYPOINT should be defined when using the container as an executable.

CMD [ "npm", "run", "prod" ]
