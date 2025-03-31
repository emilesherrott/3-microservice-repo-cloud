FROM node:16
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
ENV PORT=3000
ENV DB_USER=postgres
ENV DB_PORT=5432
ENV DB_HOST=pottery-db
ENV DB_PASSWORD=pottery
ENV DB_NAME=pottery

ENV SECRET_TOKEN=thegreatpotterythrowdown
EXPOSE 3000
CMD ["node", "index.js"]