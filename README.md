# fastify/sequelize/jwt

My first project with [fastify](https://www.fastify.io/)

## Table of Contents

- [Installation](#installation)
- [Commands](#commands)
- [Urls](#urls)

## Installation

```bash
$ git clone https://github.com/asdelatoile/fastify-sequelize-jwt
$ cd fastify-sequelize-jwt
$ npm i
$ npm run db:migrate
$ npm run db:seed
```

And then you should be able to run with

```bash
$ npm run dev
```

First user =>
email : test@test.com / password : demo

## Commands

Start server

```bash
$ npm run dev
```

Delete database

```bash
$ npm run db:delete
```

Run migrations

```bash
$ npm run db:migrate
```

Run seeds

```bash
$ npm run db:seed
```

## Urls

```
[POST] (email,password)
http://localhost:3000/register

[POST](email,password)
http://localhost:3000/login

[GET](token header)
http://localhost:3000/me
```
