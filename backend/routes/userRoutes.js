const express = require('express');
const { userSignup } = require('../controllers/userSignup');
const { userLogin } = require('../controllers/userLogin');
const { auth } = require('../middleware/auth');

const User = require("../schema/usersSchema");

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);

router.get('/authenticatedUser', auth, (req, resp) => {
    resp.status(200).json({
        success : true,
        message : "User Authenticated"
    })
})

router.get("/getUser", async (req, res) => {
    try {
      const users = await User.find(); 
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;