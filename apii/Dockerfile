FROM node:boron

# Install PM2 globally
RUN npm install -g pm2

#COPY package.json /tmp/package.json
#RUN cd /tmp && npm install
#RUN mkdir -p /usr/shortr && cp -a /tmp/node_modules /usr/shortr-api

WORKDIR /usr/shortr-api

EXPOSE 9123

ENTRYPOINT ["pm2-dev", "--no-daemon", "start", "src/server.js"]
