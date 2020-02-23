FROM node:alpine

MAINTAINER Will Li

ENV PROJECTDIR = /MRS
ENV FRONTENDDIR = /MRS/front-end

# Copy forntend files
WORKDIR $FRONTENDDIR
COPY ./package.json .
# RUN npm install
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
# RUN sudo apt update && sudo apt install yarn
RUN npm install -g yarn
RUN yarn
COPY . .

CMD ["yarn", "run", "build"]
# RUN npm run build
