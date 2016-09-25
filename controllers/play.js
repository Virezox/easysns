module.exports = function (req, res) {
  console.log('Cookie:', req.headers.cookie)
  res.writeHead(200, {
    'Set-Cookie': 'foo=bar 222; HttyOnly'
  })
  res.end()
}
