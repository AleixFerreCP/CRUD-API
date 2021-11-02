# CRUD-API

Simple API with some endpoints to serve the Angular frontend

## Endpoints

### GET "/contacts"

It retrieves all the contacts from the database.

No body required

#### Response

It will always return a 200 code with a list of the contacts' info.

### POST "/contacts"

Create a new contact.

Add all the new contact info in the body, like:

```json
{
  "name": "New Name",
  "phone": "600582123",
  "notes": "Some notes here",
  "secphone": "953428583",
  "email": "hola@email.com"
}
```

#### Response

It will always return a 201. Any 5\*\* error is due to the database capacity.

### PUT "/contacts/:id"

Edit existing contacts.

Pass the `id` of the existing contact into the URL parameters.

The body sould contain all the updated contact content like this:

```json
{
  "name": "New Name",
  "phone": "600582123",
  "notes": "Some notes here",
  "secphone": "953428583",
  "email": "hola@email.com"
}
```

#### Response

It will return a 200 code if the `id` exists.

Else a 404 code is returned.

### DELETE "/contacts/:id"

Delete a certain contact from the contacts list.

Pass the `id` of the existing contact into the URL parameters.

#### Response

It will return a 200 code if the `id` exists.

Else a 404 code is returned.
