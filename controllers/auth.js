const send = require('../utils/send')
const parseBody = require('../utils/parseBody')
const models = require('../models')
const crypto = require('crypto')

function generateToken (userId, callback) {
  var token = crypto.randomBytes(16).toString('hex')
  models.token.update(token, userId, function (err) {
    if (err) {
      return callback(err)
    }
    callback(null, token)
  })
}

function doLogin (userId, res) {
  console.log('doLogin run')
  generateToken(userId, function (err, token) {
    if (err) {
      console.log('error occured')
      return send.sendError(err, res)
    }
    console.log('success set cookie')
    res.writeHead(302, {
      'Set-Cookie': 'token=' + token + '; path=/; Http Only',
      location: '/'
    })
    res.end()
  })
}

exports.login = function (req, res) {
  parseBody(req, function (err, body) {
    if (err) {
      send.sendError(err, res)
      return
    }
    // login
    models.user.getByEmail(body.email, function (err, user) {
      if (err) {
        return send.sendError(err, res)
      }
      if (!user) {
        return send.redirect('/?err=no_user', res)
      }
      if (body.password !== user.password) {
        return send.redirect('/?err=invalid_pass', res)
      }
      doLogin(user.id, res)
    })
  })
}

exports.register = function (req, res) {
  parseBody(req, function (err, body) {
    if (err) {
      send.sendError(err, res)
      return
    }

    var user = {
      email: body.email,
      password: body.password,
      nickname: body.nickname
    }

    models.user.create(user, function (err) {
      if (err) {
        return send.sendError(err, res)
      }
      doLogin(user.id, res)
    })
  })
}
