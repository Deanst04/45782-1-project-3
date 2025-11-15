import express, { json } from 'express'
import logger from './middlewares/error/logger';
import responder from './middlewares/error/responder';
import notFound from './middlewares/not-found';
import vacationRouter from './routers/vacation';
import authRouter from './routers/auth'
import followRouter from './routers/follow'
import config from 'config'
import sequelize from './db/sequelize';
import cors from 'cors'
import { createAppBucketIfNotExists, testUpload } from './aws/aws';
import fileUpload from 'express-fileupload';
import enforceAuth from './middlewares/enforce-auth';

const app = express()


const port = config.get<number>('app.port')
const appName = config.get<string>('app.name')
const secret = config.get<string>('app.secret')

console.log(`app secret is ${secret}`)

app.use(cors())

// post decypher middleware
app.use(json())
app.use(fileUpload())

// load routers
app.use('/auth', authRouter)
app.use(enforceAuth)
app.use('/vacations', vacationRouter)
app.use('/follows', followRouter)


// not found
app.use(notFound)

// error middlewares
app.use(logger)
app.use(responder)

// synchronize database schema (not data) changes to the database
// i.e syncs our TypeScript models folder into the actual SQL schema
sequelize.sync({ force: process.argv[2] === 'sync' ? true : false })

createAppBucketIfNotExists()
// testUpload()

console.log(process.argv[2])

app.listen(port, () => console.log(`${appName} started on port ${port}`))