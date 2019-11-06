if (process.env.NODE_ENV !== 'production') { 
  require('dotenv').config()
}

const express = require('express') // поключаем экспресс
const app = express() // создаём app экспресс
const expressLayouts = require('express-ejs-layouts') // подключаем ejs-layouts
const bodyParser = require('body-parser') // библиотека боди парсер

// подключение роутов
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')  
app.use(expressLayouts)   // добавляем к app expressLayouts
app.use(express.static('public')) // указываем папку для статических файлов
app.use(bodyParser.urlencoded({limit: '10mb', extended: false})) // позволяет прочитывать req параметры (req.body.value)

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)
app.use('/authors', authorRouter)
//  'authors/new'

app.listen(process.env.PORT || 3000) 