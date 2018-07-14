# test-code

## API

### Thing

#### GET /things
Retrieve all things.

```
[
    {
        "title": "Some title",
        "id": 1,
        "author": "Some author",
        "description": "Some description"
    }
]
```
#### POST /things
Create a thing.

Request
```
{
    "title": "Some title",
    "id": 1,
    "author": "Some author",
    "description": "Some description"
}
```

Response
```
{
    "title": "Some title",
    "id": 1,
    "author": "Some author",
    "description": "Some description"
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