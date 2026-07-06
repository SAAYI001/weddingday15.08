FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json ./
COPY server.js ./
COPY index.html invite.html script.js style.css ./
COPY assets ./assets

EXPOSE 3000

CMD ["npm", "start"]
