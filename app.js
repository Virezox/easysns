var http = require('http')
var contollers = require('./controllers')
var parseUrl = require('url').parse

const rules = [
  {path: '/', controller: contollers.home},
  {path: '/user', controller: contollers.user},
  {path: '/auth/register', controller: contollers.auth.register, method: 'post'},
  {path: '/auth/login', controller: contollers.auth.login, method: 'post'},
  {path: /^\/static(\/.*)/, controller: contollers.static}
]

function notFoundController (req, res) {
  res.writeHead(404)
  res.end('Not found')
}

function find (ary, match) {
  for (var i = 0; i < ary.length; i++) {
    if (match(ary[i])) return ary[i]
  }
}

var server = http.createServer(function (req, res) {
  var urlInfo = parseUrl(req.url)

  var rule = find(rules, function (rule) {
    if (rule.method) {
      if (rule.method.toLowerCase() !== req.method.toLowerCase()) {
        return false
      }
    }
    if (rule.path instanceof RegExp) {
      var matchResult = urlInfo.pathname.match(rule.path)
      if (matchResult) {
        req.params = matchResult
      }
      return matchResult
    }
    return rule.path == urlInfo.pathname
  })

  var controller = rule && rule.controller || notFoundController
  controller(req, res)
})

server.listen(3000)
