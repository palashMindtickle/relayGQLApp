FROM node:12.16

# ensure installation
RUN node -v; yarn -v

RUN apt-get update && \
    apt-get install -y python-dev python-pip
RUN pip install awscli

COPY git.sh git.sh
RUN chmod +x git.sh
RUN bash git.sh
RUN rm git.sh

ARG npm_token
ENV NPM_TOKEN $npm_token

ARG gh_token
ENV GH_TOKEN $gh_token

WORKDIR /src

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY . .

RUN ls

RUN yarn run build

ENTRYPOINT ["yarn", "run" ,"semantic-release"]
