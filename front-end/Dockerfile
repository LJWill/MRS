FROM node:alpine

MAINTAINER Will Li


RUN mkdir /app
ENV FRONTENDDIR = /app

WORKDIR $FRONTENDDIR
COPY ./package.json /app
# RUN npm install
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
# RUN sudo apt update && sudo apt install yarn
# RUN npm install -g yarn
RUN apk add --no-cache --virtual .build-deps \
    ca-certificates \
    wget \
    tar && \
    cd /usr/local/bin && \
    wget https://yarnpkg.com/latest.tar.gz && \
    tar zvxf latest.tar.gz && \
    ln -s /usr/local/bin/dist/bin/yarn.js /usr/local/bin/yarn.js && \
    apk del .build-deps
RUN yarn
COPY ./ /app

CMD ["yarn", "build"]
# RUN npm run build
