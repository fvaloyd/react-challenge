FROM node

WORKDIR /app

COPY package.json .
run npm i

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]