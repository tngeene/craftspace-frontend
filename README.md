# craftspace-frontend

> Frontend code for art ordering system made with vue.js and django.

## Requirements

What you need to run the app.

1. Node.js installed, you can check for more info  on installation [here.](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
2. Yarn, a node dependency manager. To install, follow [this link.](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

## Setup

1. Clone the repository.
2. Make a `.env` file from the provided `.env.example` file
and paste the following values

        baseURL=http://127.0.0.1:3000
        baseAPIUrl=http://127.0.0.1:8000/api/v1/

## Build Setup

1. While at the root of the project directory, run `yarn install` to install dependencies.
2. After installation of the dependencies, run `yarn dev` to spin up the local development server.
3. Open your browser at `127.0.0.1:3000` to view the app.

  DISCLAIMER: make sure that the django backend app is running as well, instructions on setup have been included at the [backend README file](https://github.com/tngeene/craftspace-backend).

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
