const jwt = require('jsonwebtoken')
const User = require('../models/User')

// get user by token
const getUserByToken = async (token) => {

  if(!token) {
    return res.status(401).json({message: 'Acesso Negado!'})
  }

  const decoded = jwt.verify(token, 'nossosecret')

  const userId = decoded.id

  const user = await User.findById({_id: userId})
  
  return user
}

module.exports = getUserByToken
