FROM node:18-alpine3.19
WORKDIR /app

COPY package*.json .




RUN npm install
COPY . .
EXPOSE 5000


RUN npx prisma generate
CMD ["npm", "run", "dev"]