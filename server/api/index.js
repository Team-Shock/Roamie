const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/trips', require('./trips'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
