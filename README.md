# exzeo-code-challenge-server
Node server for: https://github.com/exzeo/Full-Stack-Challenge

## API

URL | Description
--- | -----------
[`POST /v1/supportTickets`] | Creates a support ticket.
[`GET /v1/supportTickets`] | Gets information about all support tickets.
[`GET /v1/supportTickets/{ticketId}`] | Gets information about a specific support ticket.
[`PATCH /v1/supportTickets/{ticketId}`] | Updates the information in a support ticket.
[`DELETE /v1/supportTickets/{ticketId}`] | Deletes a support ticket.

## POST /v1/supportTickets
Creates a support ticket.

### Request

### Successful Response

### Error Responses

## GET /v1/supportTickets
Gets information about all support tickets.

### Request

### Successful Response

### Error Responses

## GET /v1/supportTickets/{ticketId}
Gets information about a specific support ticket.

### Request

#### URL Parameters
Parameter | Description
--------- | -----------
`{ticketId}` | The `ticketId` returned by [`POST /v1/supportTickets`].

### Successful Response

### Error Responses

## PATCH /v1/supportTickets/{ticketId}
Updates the information in a support ticket.

### Request

#### URL Parameters
Parameter | Description
--------- | -----------
`{ticketId}` | The `ticketId` returned by [`POST /v1/supportTickets`].

### Successful Response

### Error Responses

## DELETE /v1/supportTickets/{ticketId}
Deletes a support ticket.

### Request

#### URL Parameters
Parameter | Description
--------- | -----------
`{ticketId}` | The `ticketId` returned by [`POST /v1/supportTickets`].

### Successful Response

### Error Responses

[`POST /v1/supportTickets`]: #post-v1supporttickets
[`GET /v1/supportTickets`]: #get-v1supporttickets
[`GET /v1/supportTickets/{ticketId}`]: #get-v1supportticketsticketid
[`PATCH /v1/supportTickets/{ticketId}`]: #patch-v1supportticketsticketid
[`DELETE /v1/supportTickets/{ticketId}`]: #delete-v1supportticketsticketid
