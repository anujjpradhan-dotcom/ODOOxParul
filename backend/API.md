# Traveloop API Documentation

## Base URL
`/api/v1`

## Authentication
All protected routes require a Bearer token in the Authorization header.
`Authorization: Bearer <access_token>`

## Error Handling
```json
{
  "success": false,
  "message": "Error description",
  "errors": { ...details }
}
```

## Endpoints

### Auth
- `POST /api/v1/auth/signup` - Create new user
- `POST /api/v1/auth/login` - Authenticate user
- `POST /api/v1/auth/refresh` - Get new access token
- `POST /api/v1/auth/logout` - Invalidate refresh token
- `GET /api/v1/auth/me` - Get current user

### Trips
- `POST /api/v1/trips` - Create trip
- `GET /api/v1/trips` - List trips
- `GET /api/v1/trips/:id` - Get trip details
- `PUT /api/v1/trips/:id` - Update trip
- `DELETE /api/v1/trips/:id` - Delete trip
- `POST /api/v1/trips/:id/duplicate` - Duplicate trip
- `GET /api/v1/public/trips/:slug` - Get public trip

### Stops
- `POST /api/v1/trips/:id/stops` - Add stop
- `PUT /api/v1/trips/:id/stops/reorder` - Reorder stops
- `PUT /api/v1/trips/:id/stops/:stopId` - Update stop
- `DELETE /api/v1/trips/:id/stops/:stopId` - Remove stop
- `GET /api/v1/trips/:id/stops/:stopId` - Get stop details

### Activities
- `GET /api/v1/activities` - Search activities
- `GET /api/v1/cities/:cityId/activities` - Get city activities
- `POST /api/v1/trips/:id/stops/:stopId/activities` - Add to stop
- `DELETE /api/v1/trips/:id/stops/:stopId/activities/:activityId` - Remove from stop
- `PUT /api/v1/trips/:id/stops/:stopId/activities/reorder` - Reorder activities

### Cities
- `GET /api/v1/cities` - Search cities
- `GET /api/v1/cities/popular` - Popular cities
- `GET /api/v1/cities/recommended` - Recommended cities
- `GET /api/v1/cities/:id` - City details

### Budget
- `GET /api/v1/trips/:id/budget` - Budget summary
- `POST /api/v1/trips/:id/stops/:stopId/expenses` - Add expense
- `PUT /api/v1/trips/:id/expenses/:expenseId` - Update expense
- `DELETE /api/v1/trips/:id/expenses/:expenseId` - Delete expense
- `GET /api/v1/trips/:id/stops/:stopId/expenses` - Get stop expenses

### Packing & Notes
- `GET /api/v1/trips/:id/packing` - Packing list
- `POST /api/v1/trips/:id/packing` - Add item
- `POST /api/v1/trips/:id/packing/bulk` - Add bulk items
- `PUT /api/v1/trips/:id/packing/:itemId/toggle` - Toggle packed status
- `DELETE /api/v1/trips/:id/packing/:itemId` - Delete item
- `POST /api/v1/trips/:id/packing/reset` - Reset packing list
- `GET /api/v1/trips/:id/packing/suggestions` - Packing suggestions
- `GET /api/v1/trips/:id/notes` - Get notes
- `POST /api/v1/trips/:id/notes` - Create note
- `PUT /api/v1/trips/:id/notes/:noteId` - Update note
- `DELETE /api/v1/trips/:id/notes/:noteId` - Delete note

### Users & Admin
- `GET /api/v1/users/profile` - Get profile
- `PUT /api/v1/users/profile` - Update profile
- `PUT /api/v1/users/password` - Change password
- `DELETE /api/v1/users/account` - Delete account
- `GET /api/v1/users/saved-destinations` - Saved destinations
- `POST /api/v1/users/saved-destinations/:cityId` - Save destination
- `DELETE /api/v1/users/saved-destinations/:cityId` - Remove destination
- `GET /api/v1/users/dashboard` - User dashboard
- `GET /api/v1/admin/stats` - Admin stats
- `GET /api/v1/admin/users` - Admin users list
- `GET /api/v1/admin/users/:userId` - Admin user details
- `GET /api/v1/admin/analytics/trips` - Trips analytics
- `GET /api/v1/admin/analytics/cities` - Cities analytics
- `GET /api/v1/admin/analytics/activities` - Activities analytics
- `GET /api/v1/admin/metrics` - Platform metrics
