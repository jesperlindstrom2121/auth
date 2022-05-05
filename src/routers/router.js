import express from 'express'

import { Controller } from '../controllers/controller.js'

export const router = express.Router()

const controller = new Controller()

router.get('/login', controller.showLogin)
router.post('/login', controller.login)
router.get('/auth/gitlab/callback', controller.callbackGitlab)
router.get('/success', controller.success)
router.get('/successed', controller.activities)

router.use('*', (req, res, next) => {
  const error = new Error()
  error.status = 404
  error.message = 'Not Found'
  next(error)
})