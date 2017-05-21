FROM nginx:latest

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/shortr-client && cp -a /tmp/node_modules /usr/shortr-client

COPY ./ /usr/shortr-client

WORKDIR /usr/shortr-client

EXPOSE 3000

ENTRYPOINT ["npm", "start"]