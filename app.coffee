express = require('express')
http    = require('http')
path    = require('path')

app     = express()
server  = require('http').createServer(app)

app.configure ->
  app.set('port', process.env.PORT or 5000)
  app.set('doc_dir', path.join(__dirname, 'docs'))
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(path.join(__dirname, 'public')))

app.configure 'development', ->
  app.use(express.errorHandler())

require('./routes')(app)

app.get('/', (req, res) ->
  res.sendfile(path.join(__dirname, 'public', 'async_comparison.html')))

server.listen(app.get('port'))
