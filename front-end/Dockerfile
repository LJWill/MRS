FROM node:alpine

MAINTAINER Will Li

ENV PROJECTDIR = /MRS
ENV FRONTENDDIR = /MRS/front-end

# Copy forntend files
WORKDIR $FRONTENDDIR
COPY ./package.json .
RUN npm install
COPY . .

# CMD ["npm", "run", "build"]
RUN npm run build
