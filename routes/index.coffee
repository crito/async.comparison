path = require('path')

posts = require('./posts')

module.exports = (app) ->
  app.get('/posts', posts.show)
