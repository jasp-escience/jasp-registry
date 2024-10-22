# jasp-registry

This repository contains the JASP registry server, which serves JASP modules that are available for download. The registry is used by the JASP application to display a list of available modules and to download them.

## setup

create a `.env` file with the following content:

```
GITHUB_CLIENT_SECRET=*************
GITHUB_CLIENT_ID=**************
GITHUB_CALLBACK_URL=**************
JWT_SECRET=**************
JWT_EXPIRATION=****
JWT_ISSUER=*************
COOKIE_SECRET=*************
COOKIE_EXPIRATION=****
```

## run with Docker

Pre-requisites: Docker
To run the registry server with Docker, you can use the following command:

```bash
make run-docker
```

## run without Docker

Pre-requisites: Node.js v22, npm
To run the registry server without Docker, you can use the following command:

```bash
make build
make run
```
