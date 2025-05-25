FROM cypress/included:latest

WORKDIR /e2e

COPY package.json package-lock.json* ./

RUN npm ci 

COPY . .

ENTRYPOINT []
CMD ["sh", "-c", "npx cypress run && npm run merge:report"]

