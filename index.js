const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./utils/config')

const exampleRouter = require('./controllers/example')
const customerRouter = require('./controllers/customers')
const purchaseRouter = require('./controllers/purchases')
const uploaderRouter = require('./controllers/uploader')
const productsRouter = require('./controllers/products')
const challengeRouter = require('./controllers/challenges')
const resultRouter = require('./controllers/results')

mongoose
    .connect(config.mongoUrl, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('connected to database', config.mongoUrl)
    })
    .catch(err => {
        console.log(err)
    })

mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())

app.use('/hello', exampleRouter)
app.use('/api/customers', customerRouter)
app.use('/api/purchases', purchaseRouter)
app.use('/api/uploader', uploaderRouter)
app.use('/api/products', productsRouter)
app.use('/api/challenges', challengeRouter)
app.use('/api/results', resultRouter)

const server = http.createServer(app)
const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
    mongoose.connection.close()
})

module.exports = {
    app, server,
}