const express = require('express')
const Posts = require('./data/db')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.send('Hello WOrld!')
})

server.post('/api/posts', (req, res) => {
  const postData = req.body
  Posts.insert(postData)
  .then( post => {
    res.status(201).json(post)

  })
  .catch(err => {
    console.log(err)
  })
})
// Get all posts.
server.get('/api/posts', (req, res) => {
  Posts.find()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err)
  })
})

// Get an individual post by id.
server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id
  Posts.findById(id)
  .then( post => {
    res.status(200).json(post)
  })
  .catch(err => {
    console.log(err)
  })
})

// Get all comments for an individual post.
server.get('/api/posts/:id/comments', (req, res) => {
  const id = req.params.id

  Posts.findPostComments(id)
  .then(comments => {
    res.status(200).json(comments)
  })
  .catch(err => {
    console.log(err)
  })
})

server.listen(8000, () => console.log('Server runnin on port 8000'))