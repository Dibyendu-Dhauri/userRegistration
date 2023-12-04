const express = require('express');
const {login,register, dashboard} = require('../controller/userController')
const verifyUser = require("../utils/verifyUser")

const router = express.Router();

const middleware = (req,res,next)=>{
  console.log('Time: ', Date.now());
  next()
}

// router.use((req, res, next) => {
//     console.log('Time: ', Date.now())
//     next()
//   })

router.get("/",verifyUser,dashboard)
router.post('/register',register);
router.post('/login',login);

module.exports = router