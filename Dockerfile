FROM node

ENV MONGO_DB_USERNAME=pranjul \
    MONGO_DB_PWD=qwerty

RUN mkdir -p testapp

COPY . /testapp

CMD ["node", "/testapp/index.js"]