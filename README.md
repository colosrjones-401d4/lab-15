## API & Auth Server 

[![Build Status](https://travis-ci.org/colosrjones-401d4/lab-15.svg?branch=master)](https://travis-ci.org/colosrjones-401d4/lab-15)

### Author: Steven Jones

### Links and Resources
* [repo](https://github.com/colosrjones-401d4/lab-15)
* [travis](https://travis-ci.org/colosrjones-401d4/lab-15)


### Setup
#### `.env` requirements
* `PORT` - 3000
* `MONGODB_URI` - mongodb://localhost/db
* `SECRET`
* `GOOGLE_API_KEY`
* `GOOGLE_CLIENT_ID`
* `GOOGLE_CLIENT_SECRET`

#### Running the app
* `npm run dbOn` - starts mongo
* `npm start` - starts server
* `POST /signup`
  * takes in `{username: username, password: password, email: email, role: role}`
  * returns a token. Token will only be able to be used one time; they also expire after 15 minutes (or specified time).
* `POST /key`
  * takes in `{username: username, password: password, email: email, role: role}`
  * returns an auth key. It has no expiration time and is reusable.
* `POST /signin`
  * Basic - can sign in with username / password
  * Bearer - can sign in with token
  * Returns a new token
* New protected routes:
  * `router.get('/public-stuff')` should be visible by anyone
  * `router.get('/hidden-stuff')` should require only a valid login
  * `router.get('/something-to-read')` should require the read capability
  * `router.post('/create-a-thing)` should require the create capability
  * `router.put('/update)` should require the update capability
  * `router.patch('/jp)` should require the update capability
  * `router.delete('/bye-bye)` should require the delete capability
  * `router.get('/everything')` should require the superuser capability
  
#### Tests
* `npm test`
* Tests that each of the protected routes are successful given the user has appropriate capability
* Tests that unauthorized users cannot access certain protected routes based on their capabilties
