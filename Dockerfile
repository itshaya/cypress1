FROM cypress/included:latest

WORKDIR /e2e

COPY package.json package-lock.json* ./

RUN npm ci 

COPY . .

CMD ["npx","cypress","run"]
