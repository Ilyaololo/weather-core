# Core

## Description

Example nodejs application with Nest.js

## Getting started

First, install all dependency

```bash
yarn install
```

After installing, you need configurate yours .env file. Copy `.env.sample` to `.env` in root directory of project and set all empty variables.

For lauching application

```bash
yarn run start
```

## Technology

* [graphql](https://graphql.org/)
* [nestjs](https://nestjs.com/)
* [typeorm](http://typeorm.io/)

## Structure

```bash
src
├── configs             ── configs
├── decorators          ── common decorators
├── exceptions          ── common exceptions
├── guards              ── common guards
├── interceptors        ── common interceptors
├── interfaces          ── common interfaces
├── middleware          ── common middleware
├── migrations          ── typeorm migrations folder
├── modules             ── application modules
├── pipes               ── common pipes
├── providers           ── common providers
├── templates           ── email templates
├── typedefs            ── common graphql types
├── utils               ── util functions
└── app.ts              ── entry point
```

## License

MIT
