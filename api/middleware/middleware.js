function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log('logger middleware', `[${timeStamp}] ${method} to ${url}`)
  // console.log(`${req.method} ${req.url} ${req.timeStamp}`);

  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log('logger middleware')
  next()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('logger middleware')
  next()
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