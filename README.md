# test-code

## Setup

### Heroku
Click this button to set the app up on Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/IsaiahJTurner/test-code/)

### Locally
You will need postgres setup and running locally.

1. Clone the repository.
2. `npm install`
3. Seed the database using `DATABASE_URL=postgres://IsaiahJTurner@127.0.0.1 npm run seed`
3. Run the app using `DATABASE_URL=postgres://IsaiahJTurner@127.0.0.1 npm start`

## API

All errors will be sent in the following format.
```
{
    "error": {
        "message": "An error message"
    }
}
```
### Thing

#### GET /things
Retrieve all things.

```
[
    {
        "title": "Some title",
        "id": 1,
        "author": "Some author",
        "content": "Some content"
    }
]
```
#### POST /things
Create a thing.

Request
```
{
    "title": "Some title",
    "author": "Some author",
    "content": "Some content"
}
```

Response
```
{
    "title": "Some title",
    "id": 1,
    "author": "Some author",
    "content": "Some content"
}
```
#### PATCH /things/:thingId
Update a thing.

Request
```
{
    "title": "Some title",
    "author": "Some author",
    "content": "Some content"
}
```

Response
```
{
    "title": "Some title",
    "id": 1,
    "author": "Some author",
    "content": "Some content"
}
```
#### GET /things/:thingId
Retrieve a thing by it's ID.

Response
```
{
    "title": "Some title",
    "id": 1,
    "author": "Some author",
    "description": "Some description"
}
```
#### DELETE /things/:thingId
Delete a thing with the given ID.

Response
No Content