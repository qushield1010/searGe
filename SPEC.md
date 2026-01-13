# Project Specification

search engine for textual and other filters in documents(pdf, office...) web app.
it will include backend dir and frontend dir and here we will implement only the frontend.
with mock data from backend. 
tech stach: 
    front - React+VITE+Type script+material dessign
    backend - python+fast api+ no need for db because based on API (we will not implement it)

## 1) Elevator pitch (one sentence)

search engine google like. based on API for textual search in documents and also advanced search.

## 2) Primary users (who) and goals (why)


## 3) Frontend pages / components

there will be 2 pages:
1. home page- will have title: searGe and will have input line for search text and button for advanced search that will contain more search fields
2. result page- will contain list of result
a. each result will have
- title 
- couple of rows from the text (preview)
- button to open document
b. pagination


## 6) API endpoints / backend contract

- POST /api/signup — body: {email, password} — returns: {user, token}
- GET /api/items — auth required — returns: [{...}]


## 8) Auth, roles, permissions


## 9) Integrations (email, payments, search, 3rd-party APIs)


## 10) Non-functional requirements


## 11) Deployment & hosting constraints


## 14) Acceptance tests / success metrics


---

done