import express from 'express'
import { router } from './router/router.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import ejs from 'ejs'
import session from 'express-session'

const app = express();

const dFullName = dirname(fileURLToPath(import.meta.url))


  app.set('view engine', 'ejs') // create hbs files.
  app.set('views', join(dFullName, 'views'))

  const sessionOptions = {
    name: 'user_sid',
    secret: 'hello there', 
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 
    }
  }

  app.use(session(sessionOptions))

  app.use((req, res, next) => {
    res.locals.ff = req.session.token
    next()
  })

  app.use('/', router)
//app.set('view engine', 'ejs');
var access_token = "";

/*app.get('/', function(req, res) {
  res.render('pages/index',{client_id: clientID});
});*/

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));

