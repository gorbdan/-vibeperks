# API

## `GET /api/offers/active`

Returns one active offer.

Query:

- `client_id` optional, used to avoid showing the same offer again within 6 hours.

## `POST /api/impressions`

Body:

```json
{
  "offer_id": "uuid",
  "client_id": "optional-client-id",
  "source": "cli"
}
```

## `POST /api/clicks`

Body:

```json
{
  "offer_id": "uuid",
  "client_id": "optional-client-id",
  "source": "cli"
}
```

## `GET /api/admin/offers`

Requires `Authorization: Bearer <ADMIN_TOKEN>`.

## `POST /api/admin/offers`

Requires `Authorization: Bearer <ADMIN_TOKEN>`.

Body:

```json
{
  "title": "Railway gives $20 credits",
  "description": "Optional note",
  "url": "https://example.com",
  "emoji": "🎁"
}
```

## `PATCH /api/admin/offers?id=<offer_id>`

Requires `Authorization: Bearer <ADMIN_TOKEN>`.

Body:

```json
{
  "active": false
}
```
