#!/bin/bash

BASE_URL="http://localhost:5000/api/v1"

echo "Testing Health Check..."
curl -s "$BASE_URL/../health" | grep -q "ok" && echo "Health OK" || echo "Health Failed"

echo "Testing Auth Signup..."
RES=$(curl -s -X POST "$BASE_URL/auth/signup" -H "Content-Type: application/json" -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"Password123!"}')
TOKEN=$(echo $RES | grep -o '"accessToken":"[^"]*' | grep -o '[^"]*$')

echo "Testing Create Trip..."
curl -s -X POST "$BASE_URL/trips" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"name":"Paris Trip","startDate":"2026-06-01T00:00:00Z","endDate":"2026-06-10T00:00:00Z"}' | grep -q "success\":true" && echo "Create Trip OK" || echo "Create Trip Failed"

echo "API tests completed!"
