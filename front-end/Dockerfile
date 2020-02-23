FROM node:alpine

MAINTAINER Will Li

ENV FRONTENDDIR = MRS/movie/front-end

WORKDIR $FRONTENDDIR
COPY package.json /front-end
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
COPY . /front-end

CMD ["yarn", "build"]
# RUN npm run build
