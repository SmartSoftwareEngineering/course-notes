# Extending CRUD MERN Stack towards Business Logic Implementation (Log In & Sign Up)

This project is using the same stack and similar architecture as demonstrated in last project i.e. [basic crud app using MERN](../week09/).


## Features included

- Sign Up
- Login
- Home Page

### Basic Use Case:
- Run the application (Backend + MongoDB, and Frontend)
- Use the frontend's provided URL, and open it in browser.
- It will redirect you to the `login` URL
- Click the `Sign Up` button on the `Log In` Page
- You will be re-directed to `Sign Up` Page.
- Provide the required details and click `Sign Up` button
- Notice that you will be logged in on successful credentials setup.
- Click Logout button on `Home` Page
- You will be redirected to `login` page again
- Enter credentials based on the user credentials of newly signed up user.
- Notice that you will be able to successfully login.
## How to run the project
### Part-1: Start Backend

- Open the backend folder of project in an editor
- Create a copy of `.env.example` file, and rename the copy to be `.env`
- Add the MongoDB URI in the respective environment variable

- Open the backend folder of project in one terminal
- Run `npm install` command
- Run `npm run dev` command

### Part-2: Start Backend

- Open the frontend folder of project in another terminal
- Run `npm install` command
- Run `npm run dev` command

## Things to explore in Backend

- Use of modular approach for Routes, Controllers, Models and Providers.
- Use of `--watch` in `dev` script of `package.json` for hot-reloding.
- Use of `.env` file to create environment variables, `process.env.MONGO_URI` to read the mongo URI value, and `dotenv` npm package to create environment variables based on `.env` file.
- Adding `.env` file to `.gitignore` to avoid commiting the Mongo URI and credentials into code repository
- Use of `bcryptjs` npm package, and `hashSync` and `compareSync` function to store and verify user credentials in their hashed form.
- Use of `(({password:_, ...user}) => user)(existingUser._doc)` to ignore password before returning user details to the client side

## Things to explore in Frontend

- Use of `react-router-dom` to create and navigate between different web routes i.e. `/login`, `/signup`, and `/`
- Use of `BrowserRouter as Router` while importing to rename the imported module
- Use of `localStorage` to save user details. And use the value of `user` key in `localStorage` to track if user is currently logged in.
- Conditional navigation based on `user` state that holds value of a logged in user
- Use fo `Routers`, `Routes` and `Navigate` to make the workflow logical and aligned with web application URL
