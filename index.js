const express = require('express');
const config = require('./config/default.json');
const mongoose = require('mongoose')

const app = express();

app.use('/api/auth',require('./routes/auth-routes'))

const PORT = config.port || 5000;
const mongoUri = config.mongoUri

async function start() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(PORT, () => {
            console.log(`Server is started on port ${PORT}`)
        })
    } catch (e) {
        console.log("Error: ", e)
        process.exit(1)
    }
}

start()

