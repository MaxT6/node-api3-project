const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log('logger middleware', `[${timeStamp}] ${method} to ${url}`)
  // console.log(`${req.method} ${req.url} ${req.timeStamp}`);

  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  // console.log('validateUserId middleware')
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      res.status(404).json({message: "user not found"})
    } else {
      req.user = user
      next()
      }
    } catch (error) {
      res.status(500).json({
        message: "problem finding user"
      })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('logger middleware')
  const {name} = req.body
  if (!name || name.trim()) {
    res.status(400).json({ message: "missing required name field"})
  } else {
    req.name = name.trim()
     next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('logger middleware')
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,

}