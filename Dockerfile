FROM debian:stretch
RUN apt-get update && apt-get install -y curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs
COPY /src/package.json /code/package.json
COPY /src/package-lock.json /code/package-lock.json
WORKDIR /code/
RUN npm install
