# LAB 15 - API & AUTH SERVER

[![Build Status](https://travis-ci.org/colosrjones-401d4/lab-15.svg?branch=master)](https://travis-ci.org/colosrjones-401d4/lab-15/builds/594248960)

### Author: Steven Jones

### Links and Resources
* [repo](https://github.com/colosrjones-401d4/lab-15/pull/2)
* [travis](https://travis-ci.org/colosrjones-401d4/lab-15/builds/594248960)

#### Documentation
* [api docs](https://localhost:3333/api-docs)
* [jsdoc](https://localhost:3000/docs)

### Setup
#### `.env` requirements
* `PORT` - 3000
* `MONGODB_URI` - `mongodb://localhost:27017/lab15`

#### Running the app
* `npm start`
* Endpoint: `/api/v1/categories`
  * Returns a JSON object category data in it.
* Endpoint: `/api/v1/products`
  * Returns a JSON object with product data in it.
  
#### Tests
* `npm test`