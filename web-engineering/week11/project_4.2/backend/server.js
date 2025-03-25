import express, { json, urlencoded } from 'express';
import cors from 'cors';
import allRoutes from './routes/index.js';
import './providers/db.js'

const app = express()
app.use(cors())
app.use(json())
app.use(urlencoded({extended: true}))


app.use('/api/v1', allRoutes);


app.listen(5000, () => {
  console.log('Server started')
})
