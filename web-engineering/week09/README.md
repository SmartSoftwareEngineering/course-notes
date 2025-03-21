# Basic CRUD App using MERN stack

This project is a simple MERN-stack based CRUD app.

## Project
### Backend
The backend is the same as we implemented a [couple of weeks ago](../week06/) where we created following REST Web APIs.
    - GET /api/v1/items
    - POST /api/v1/items
    - GET /api/v1/items/:id
    - PUT /api/v1/items/:id
    - DELETE /api/v1/items/:id

The current implementation adds CORS to allow processing of backend requests from the frontend origin.

### Frontend
The frontend is using react project built from scratch using Vite.

1) It then creates following components in [component folder](./project_4.0/frontend/src/components/)
    - Header
    - ItemForm: To display the form that can be used to Add/Edit items
    - ItemList: To display the whole list of items on the page
    - ItemRow: To display indvidual item details in item list
    - Notification: To generate Window notification

2) It creates an [api.js](./project_4.0/frontend/src/services/api.js) that provides resulable functions to interact with web apis of backend for operations of get items, add  item, edit item, and delete item.


## What new:
This project offers the following:
- Putting minimal things together to form a complete CRUD app using MERN
- Covers the concept of useEffect to fetch all items on page load

## Setup Project:

For Backend
1) Update the Mongo db url and credentials in [backend/server.js](./project_4.0/backend/server.js)
2) Open the backend folder in a terminal and run `npm install` and `npm start`

For Frontend
1) Open the frontend folder in a terminal and run `npm install` and `npm run dev`
2) Open the url from above command in the browser to interact with the CRUD app