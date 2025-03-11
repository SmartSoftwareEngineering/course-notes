# Week 07: A basic CRUD app using NodeJS + ExpressJS + EJS + Mongo DB + Mongoose

## About the Project
This project covers following topics to help us experience a few classical concepts of web development:

- Impelements following endpoints using NodeJS and ExpressJS
    - Get /items
    - POST /items
    - Get /items/:id
    - PUT /items/:id
    - Delete /items/:id

- Uses Mongoose for connection to MongoDB
    - Uses Schema file [Model/Items.js](./project_02.1/models/item.js) to create collection with Items name that has following fields
        - name (string, required)
        - description (string, required)
        - createdAt (Date, defaults to now)

- Uses EJS for dynamic server-side html redering
    - Uses EJS-based Templates for header, footer, and dynamic content
    - Uses mongodb queries at the time of request handling to fetch data from DB embed into through EJS templates
    - Uses Redirection to handle form requests and make the application act like Single-page application

- Uses methodOverride middleware to handle PUT and Delete requests while the actual header type is POST request

## How to run it

1- Setup mongodb either locally or using mongo cloud
2- Set the correct mongo db connection string using variable `MONGO_DB_CONNECTION_STRING`
3- Open the project folder in terminal and run `npm install`
4- Run `npx node server.js`
5- Open the browser and open URL `http://localhost:5000/items`