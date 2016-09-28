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
Creates a support ticket. After a successful POST to create the search ticket, the support team will be notified of the ticket and respond as soon as possible. Since some tickets are more complex than others, your ticket may be answered in a matter of minutes or a matter of days depending on assessed complexity.

### Request

#### Request Headers
Name | Description
---- | -----------
`Content-Type` | `application/json`

#### Request Body

- `description` (String) **Required.** The contents of the support ticket, should be a description of the problem that a technician can use to solve the users problem.
- `email` (String) **Required.** Customer email that will be used to report progress and for any feedback.

### Successful Response

#### Response Body

JSON with information about the support ticket.

- `ticketId` (String) Unique id of this support ticket.
- `createdDateTime` (DateTime) The date and time the ticket was created in UTC, using the [ISO 8601 format]. (e.g. 2012-12-21T17:30:15.450Z)
- `updatedDateTime` (DateTime) The date and time the ticket was last updated in UTC, using the [ISO 8601 format]. (e.g. 2012-12-21T17:30:15.450Z)
- `assignee` (String) Username of the support member assigned to this ticket. Will be `null` if the ticket is unassigned.
- `state` (String) State of the ticket.
    - `"created"`: The ticket is awaiting a support team member's attention.
    - `"processing"`: The ticket is currently being looked at by the support team.
    - `"closed"`: The ticket is complete and the customer has been notified with next steps.

### Error Responses

Status Code | Error Code | Description
----------- | ---------- | -----------
`400` | `"invalid_json"` | The JSON body was not parseable. Please fix your input before retrying the request.
`400` | `"missing_header"` | The request was missing a required header. See more information in `"errorDetails"`.
`400` | `"invalid_header"` | The request included an invalid header. See more information in `"errorDetails"`.
`400` | `"missing_input"` | The request was missing a required input property. See more information in `"errorDetails"`.
`400` | `"invalid_input"` | The request included an invalid input property. See more information in `"errorDetails"`.
`500` | `"internal_error"` | An unknown error occured, the request was not completed successfully.

### Example

#### Request

```
POST /v1/supportTickets
Content-Type: application/json

{
    "description": "Contents of the support ticket.",
    "email": "email@example.com"
}
```

#### Response

```
HTTP/1.1 201 Created
Content-Type: application/json

{
    "ticketId": "e8dqznl6xsb8atft8ph67uv7vi",
    "createdDateTime": "2012-12-21T17:30:15.450Z",
    "updatedDateTime": "2012-12-21T17:30:15.450Z",
    "assignee": null,
    "state": "created"
}
```

## GET /v1/supportTickets
Gets information about all support tickets.

### Request

#### Query String Parameters

Parameter | Description
--------- | -----------
`sort` | Which direction to sort in, can be `asc` or `desc`. Default is `asc`.
`sort_by` | Which value to use for sorting, can be `createdDate`, `updatedDate`, or `state`. Default is `updatedDate`.
`since_id` | Which support ticket (`ticketId`) should be used as a starting point for this request.
`limit` | Limit the number of support tickets you will receive. Must be an integer above `0`. Default is `20`.

### Successful Response

#### Response Headers

Header Name | Description
----------- | -----------
result-count | Total number of results that match your query. You can use `since_id` and `limit` to page through all of these results.

#### Response Body

JSON with information about the support tickets.

- `tickets[]` (Array of Objects) Array of support tickets that match the request query.
    - `ticketId` (String) Unique id of this support ticket.
    - `createdDateTime` (DateTime) The date and time the ticket was created in UTC, using the [ISO 8601 format]. (e.g. 2012-12-21T17:30:15.450Z)
    - `updatedDateTime` (DateTime) The date and time the ticket was last updated in UTC, using the [ISO 8601 format]. (e.g. 2012-12-21T17:30:15.450Z)
    - `assignee` (String) Username of the support member assigned to this ticket. Will be `null` if the ticket is unassigned.
    - `state` (String) State of the ticket.
        - `"created"`: The ticket is awaiting a support team member's attention.
        - `"processing"`: The ticket is currently being looked at by the support team.
        - `"closed"`: The ticket is complete and the customer has been notified with next steps.
- `errorCode` (String) Error code that's present when there was a problem sending all requested data.

### Error Responses

Status Code | Error Code | Description
----------- | ---------- | -----------
`500` | `"internal_error"` | An unknown error occured, the request was not completed successfully.

## GET /v1/supportTickets/{ticketId}
Gets information about a specific support ticket.

### Request

#### URL Parameters

Parameter | Description
--------- | -----------
`{ticketId}` | The `ticketId` returned by [`POST /v1/supportTickets`].

### Successful Response

#### Response Body

JSON with information about the requested support ticket.

- `ticketId` (String) Unique id of this support ticket.
- `createdDateTime` (DateTime) The date and time the ticket was created in UTC, using the [ISO 8601 format]. (e.g. 2012-12-21T17:30:15.450Z)
- `updatedDateTime` (DateTime) The date and time the ticket was last updated in UTC, using the [ISO 8601 format]. (e.g. 2012-12-21T17:30:15.450Z)
- `assignee` (String) Username of the support member assigned to this ticket. Will be `null` if the ticket is unassigned.
- `state` (String) State of the ticket.
    - `"created"`: The ticket is awaiting a support team member's attention.
    - `"processing"`: The ticket is currently being looked at by the support team.
    - `"closed"`: The ticket is complete and the customer has been notified with next steps.

### Error Responses

Status Code | Error Code | Description
----------- | ---------- | -----------
`404` | `"not_found"` | The requested `ticketId` does not exist, it may have been deleted or never existed.
`500` | `"internal_error"` | An unknown error occured, the request was not completed successfully.

### Example

#### Request

```
GET /v1/supportTickets/g4ypiqvsvrx9ris8phcmims4i
```

#### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
    "ticketId": "g4ypiqvsvrx9ris8phcmims4i",
    "createdDateTime": "2012-12-21T17:30:15.450Z",
    "updatedDateTime": "2012-12-21T17:42:12.981Z",
    "assignee": "travis.studemeyer",
    "state": "processing"
}
```

## PATCH /v1/supportTickets/{ticketId}
Updates the information in a support ticket. At least one property is needed in the body, but none are required.

### Request

#### URL Parameters
Parameter | Description
--------- | -----------
`{ticketId}` | The `ticketId` returned by [`POST /v1/supportTickets`].

#### Request Body

- `description` (String) The contents of the support ticket, should be a description of the problem that a technician can use to solve the users problem.
- `email` (String) Customer email that will be used to report progress and for any feedback.
- `assignee` (String) Support technician assigned to the ticket.
- `state` (String) State of the ticket.
    - `"created"`: The ticket is awaiting a support team member's attention.
    - `"processing"`: The ticket is currently being looked at by the support team.
    - `"closed"`: The ticket is complete and the customer has been notified with next steps.

### Successful Response

#### Response Body

JSON with information about the updated support ticket.

- `ticketId` (String) Unique id of this support ticket.
- `createdDateTime` (DateTime) The date and time the ticket was created in UTC, using the [ISO 8601 format]. (e.g. 2012-12-21T17:30:15.450Z)
- `updatedDateTime` (DateTime) The date and time the ticket was last updated in UTC, using the [ISO 8601 format]. (e.g. 2012-12-21T17:30:15.450Z)
- `assignee` (String) Username of the support member assigned to this ticket. Will be `null` if the ticket is unassigned.
- `state` (String) State of the ticket.
    - `"created"`: The ticket is awaiting a support team member's attention.
    - `"processing"`: The ticket is currently being looked at by the support team.
    - `"closed"`: The ticket is complete and the customer has been notified with next steps.

### Error Responses

Status Code | Error Code | Description
----------- | ---------- | -----------
`404` | `"not_found"` | The requested `ticketId` does not exist, it may have been deleted or never existed.
`400` | `"missing_header"` | The request was missing a required header. See more information in `"errorDetails"`.
`400` | `"invalid_header"` | The request included an invalid header. See more information in `"errorDetails"`.
`400` | `"invalid_input"` | The request included an invalid input property. See more information in `"errorDetails"`.
`500` | `"internal_error"` | An unknown error occured, the request was not completed successfully.

### Example

#### Request

```
PATCH /v1/supportTickets/9ke04q7zvhyf1cczw2buik9
Content-Type: application/json

{
    "assignee": "john.jacob.jingleheimerschmidt",
    "state": "processing"
}
```

#### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
    "ticketId": "9ke04q7zvhyf1cczw2buik9",
    "createdDateTime": "2012-12-21T17:30:15.450Z",
    "updatedDateTime": "2012-12-21T18:12:12.981Z",
    "assignee": "john.jacob.jingleheimerschmidt"
    "state": "processing"
}
```

## DELETE /v1/supportTickets/{ticketId}
Deletes a support ticket.

### Request

#### URL Parameters
Parameter | Description
--------- | -----------
`{ticketId}` | The `ticketId` returned by [`POST /v1/supportTickets`].

### Successful Response

#### Response Body

JSON with information about the updated support ticket.

- `ticketId` (String) Unique id of this support ticket.

### Error Responses

Status Code | Error Code | Description
----------- | ---------- | -----------
`404` | `"not_found"` | The requested `ticketId` does not exist, it may have been deleted or never existed.
`500` | `"internal_error"` | An unknown error occured, the request was not completed successfully.

### Example

#### Request

```
DELETE /v1/supportTickets/c64amlsupexgfi1ubxyivsra4i
```

#### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
    "ticketId": "c64amlsupexgfi1ubxyivsra4i"
}
```

[`POST /v1/supportTickets`]: #post-v1supporttickets
[`GET /v1/supportTickets`]: #get-v1supporttickets
[`GET /v1/supportTickets/{ticketId}`]: #get-v1supportticketsticketid
[`PATCH /v1/supportTickets/{ticketId}`]: #patch-v1supportticketsticketid
[`DELETE /v1/supportTickets/{ticketId}`]: #delete-v1supportticketsticketid

[ISO 8601 format]: https://en.wikipedia.org/wiki/ISO_8601
