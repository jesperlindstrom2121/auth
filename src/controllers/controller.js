import express from 'express'

import axios from 'axios'

export const router = express.Router()

/**
 * User.
 */

/**
 *
 */
export class Controller {
 
  /**
   * Render login page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {object} next - Next.
   */

   

  async showLogin (req, res, next) {
    res.render('pages/index')
  }

  async callbackGitlab (req, res, next) {
  //  console.log(req)
    const code = req.query.code

    //console.log(code, 'vv')
   axios({
      method: 'post',
      url: `https://gitlab.lnu.se/oauth/token?client_id=0572e646e500d97a03871b3aaa14203f5973146a381b5a324707561b36d1f8af&client_secret=7312a5504298a100a79b94a66ca72fc6e320d7973bc2aaa9432edef23579fe47&code=${code}&grant_type=authorization_code&redirect_uri=http://www.fishcatch.se:3000/auth/gitlab/callback`,
      // Set the content type header, so that we get the response in JSON
      headers: {
           accept: 'application/json'
      }
    }).then((response) => {
   
      req.session.token = response.data.access_token
    console.log('ff')
     res.redirect('/success')
      //access_token = response.data.access_token
    }).catch(err => console.log('fffr'))
    
  }

  async activities (req, res, next) {
    try{
    console.log('wwwweewewewewe')
    axios({
      method: 'get',
      url: `https://gitlab.lnu.se/api/v4/events?per_page=101&access_token=a813be3fada8005a51fbf26ffabf5e1a06e95c59c29d061b023367209753be85`,
      headers: {
        
      }
    }).then((response) => {
      console.log(response.data)
      
      console.log('dd')
      console.log(response.data.length)
      res.render('pages/activities',{ userData: response.data });
    }).catch(function (error){
      console.log(error)
    })
    }
    catch(e){
      console.log(e)
    }
  }

  async login (req, res, next) {
    res.redirect('https://gitlab.lnu.se/oauth/authorize?client_id=0572e646e500d97a03871b3aaa14203f5973146a381b5a324707561b36d1f8af&response_type=code&state=dfg2332ffrfr&redirect_uri=http://www.fishcatch.se:3000/auth/gitlab/callback&scope=api')
  }

  async success (req, res) {
   // console.log(req.session)
    axios({
      method: 'get',
      url: `https://gitlab.lnu.se/api/v4/user?access_token=a813be3fada8005a51fbf26ffabf5e1a06e95c59c29d061b023367209753be85`,
      headers: {
        
      }
    }).then((response) => {
     // console.log(response.data, 'dd')
      res.render('pages/loggedin',{ userData: response.data });
    })
  }
}
