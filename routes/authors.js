const express = require('express') // подключаем экспресс
const router = express.Router() // роутер => метод библиотеки экспресс
const Author = require('../models/author') // импортируем монрусс схему 


// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
    
  } 
  try {
    const authors = await Author.find( searchOptions ) 
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    })  // пути до Шаблонов
  } catch {
    res.redirect('/')
  }
})

// New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })  // пути до Шаблонов
})

// Create Author Route
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name
  }) 
  try {
    const newAuthor = await author.save()
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`)
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creting Author'
    })
  }

})

module.exports = router