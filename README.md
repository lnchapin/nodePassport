# Local Strategy Passport

## Background
This was converted from Brad Traversy's [Node.js With Passport Authentication](https://www.youtube.com/watch?v=6FOq4cUdH8k) video. That tutorial was written with EJS and Mongo. I converted this to Sequalize with EJS and Sequalize with Handlebars.

## To Run Locally
- `git clone`
- move into the file that you want to work with
- `npm i`
- create a `.env` file and add SALT_VAL and SESSION_SECRET (the seeds file uses a SALT_VAL of 13)
- run `npx sequelize db:migrate` and `npx sequelize db:seed:all`
- `nodemon server.js`

  * The password for the seed accounts are `password`

## Technology Used
Express, Node, Sequalize, Passport, EJS, Handlebars, and related packages.
