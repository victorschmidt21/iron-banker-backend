
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/main"]