import { } from 'dotenv/config';
import express from 'express';
const app = express();
import { dirname, join } from 'path';
import { logger, logEvents } from "./middleware/logger.js";
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from "./config/corsOptions.js"
import connectDB from './config/dbConn.js';
import mongoose from 'mongoose';
import root from "./routes/root.js";
import auth from "./routes/authRoutes.js"
import users from "./routes/userRoutes.js"
import expense from "./routes/expenseRoutes.js"
import category from "./routes/categoryRoutes.js"
import income from "./routes/incomeRoutes.js"
// import chart from "./routes/chartRoutes.js"

import { fileURLToPath } from 'url';
const PORT = process.env.PORT || 3500;

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use('/', express.static(join(__dirname, 'public')));

app.use('/', root)
app.use('/auth', auth)
app.use('/users', users)
app.use('/expense', expense)
app.use('/category', category)
app.use('/income', income)
// app.use('/chart', chart)

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})