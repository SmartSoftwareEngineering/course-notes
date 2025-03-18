# Basic CRUD operations on item records using REST APIs + Node + Express + Mongoose

1) This project uses express to add following end points:
    - GET /api/v1/items
    - POST /api/v1/items
    - GET /api/v1/items/:id
    - PUT /api/v1/items/:id
    - DELETE /api/v1/items/:id

2) It uses Mongoose to connect to MongoDB, and perform CRUD operations on collection
    - Defines Schema in models folder
    - Performs CRUD operations using find, findById, save, findByIdAndUpdate, findByIdAndDelete
