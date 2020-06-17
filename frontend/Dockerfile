
# statements lookups here:
# https://docs.docker.com/engine/reference/builder/

# The FROM instruction initializes a new build stage and sets the Base Image for subsequent instructions. As such, a valid Dockerfile must start with a FROM instruction.
# FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]

FROM beevelop/ionic:latest AS ionic

# create app directory
WORKDIR /usr/src/app

# install app dependencies

COPY package*.json ./

# install with "clean slate" https://docs.npmjs.com/cli/ci.html
RUN npm ci

# copy and build
# The COPY instruction copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>.
COPY . .

RUN ionic build

# Run
# https://hub.docker.com/_/nginx
# FROM can appear multiple times within a single Dockerfile to create multiple images or use one build stage as a dependency for another.
# Simply make a note of the last image ID output by the commit before each new FROM instruction. Each FROM instruction clears any state created by previous instructions.
FROM nginx:alpine

# Optionally a name can be given to a new build stage by adding AS name to the FROM instruction.
# The name can be used in subsequent FROM and COPY --from=<name|index> instructions to refer to the image built in this stage.
# the --from=ionic here is referring to the first FROM .. AS ionic
COPY --from=ionic  /usr/src/app/www /usr/share/nginx/html
