import express from 'express'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

import 'express-async-errors'
import morgan from 'morgan'

//db and auth
import connectDB from "./db/connect.js";

//routes
import authRoutes from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

//middlewares
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== '!production') {
  app.use(morgan('dev'))
}

app.use(express.json())

const port = process.env.PORT || 5000

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'API!' })
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', authenticateUser, jobsRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

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