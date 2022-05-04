import express from 'express'

import { Controller } from '../controllers/controller.js'

export const router = express.Router()

const controller = new Controller()

router.get('/login')
router.post('/login')
router.get('/auth/gitlab/callback')
router.get('/success')
router.get('/successed')

router.use('*', (req, res, next) => {
  const error = new Error()
  error.status = 404
  error.message = 'Not Found'
  next(error)
})