FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build 

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s" , "dist"]
