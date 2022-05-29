import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
import morgan from 'morgan'

const app = express()
dotenv.config()

import {dirname} from 'path'
import {fileURLToPath} from 'url'
import path from 'path'

//db and auth
import connectDB from "./db/connect.js";

//routes
import authRoutes from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

//middlewares
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(express.static(path.resolve(__dirname, './client/build')))
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', authenticateUser, jobsRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.DB_URL)
    app.listen(port, () => {
      console.log(`Server is running on port : ${port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()