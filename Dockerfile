FROM node:16-alpine3.12

RUN npm install -g npm@8.1.4
WORKDIR /app

COPY . ./
ENV PATH /app/node_modules/.bin:$PATH
RUN npm i

ENV PORT 80

ENTRYPOINT ["npm"]
CMD ["start"]
