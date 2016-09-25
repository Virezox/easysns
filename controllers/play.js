module.exports = function (req, res) {
  res.writeHead(200, {
    'Set-Cookie': 'foo=bar 222; HttyOnly'
  })
  res.end()
}
