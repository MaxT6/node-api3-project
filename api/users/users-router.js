const express = require('express');
const { validateUserId, validateUser, validatePost, } = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const User = require('./users-model');
const Post = require('../posts/posts-model');

const router = express.Router();



router.get('/', (req, res, next) => {
  User.get()
  .then(users => {
    res.json(users)
  })
  .catch(next)
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res, next) => {
  // console.log(req.user)
  // console.log(req.name)
  User.insert({name: req.name})
    .then(newUser => {
      // throw new Error('ouch')
      res.status(201).json(newUser)
    })
    .catch(next)
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  console.log(req.user)
  console.log(req.name)

  User.update(req.params.id, { name: req.name })
  .then(() => {
    return User.getById(req.params.id)
  })
  .then(updatedUser => {
    res.json(updatedUser)
  })
  .catch(next)
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, async (req, res, next) => {
try {
  const result = await User.remove(req.params.id)
 res.json(req.user)
  } catch(err) {
    next(err)
  }
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  console.log(req.user)
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const result = await User.getUserPosts(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {

  try {
    // throw new Error('demons!')
    const result = await Post.insert({
      user_id: req.params.id, 
      text: req.text,
    })
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }


  // console.log(req.user)
  // console.log(req.text)
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

})

router.use((err, reg, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'somthing tragic inside posts router happened',
    message: err.message,
    stack: err.stack,
  })
})

// do not forget to export the router
module.exports = router;