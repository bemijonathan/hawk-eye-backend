FROM node:14-slim

WORKDIR /usr/app/hawk-eye

COPY package.json .

RUN npm i

CMD [ "npm", "run", "start" ]

EXPOSE 3000