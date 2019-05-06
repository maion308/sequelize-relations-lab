const express = require('express')
const { Author, Book } = require('../model')
const authorRouter = express.Router()

authorRouter.get('/', async (req, res) => {
  try {
    const authors = await Author.findAll({
      include: [ Book ]
    })
    res.json({
      authors
    })
  } catch(e) {
    res.send(500).json({ msg: e.message })
  }
})

// GET one
authorRouter.get('/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const author = await Author.findByPk(id)

    if (!author) throw Error('Author not found');

    response.json({
      author
    })
  } catch (e) {
    response.status(404).json({ msg: e.message })
  }
})

// CREATE one

authorRouter.post('/', async (request, response) => {
  try {
    const author = await Author.create(request.body)
    response.json({
      author
    })
  } catch (e) {
    response.status(500).json({ msg: e.message })
  }
})

// UPDATE one


// DELETE one
authorRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id
    console.log(id)

    const author = await Author.findByPk(id)

    if(author) await author.destroy()

    response.json({
      message: `Author with id ${id} deleted`
    })
  } catch (e) {
    response.json({ msg: e.message })
  }
});

module.exports = {
  authorRouter
}
