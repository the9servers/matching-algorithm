const { Router } = require('express');
const authController = require("../controllers/authController");
const bodyParser = require ("body-parser");

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = Router();

router.get("/register", authController.register);
router.get("/login", authController.login);
router.get("/users/:userId", authController.updateProfile);
router.get("/getMatches", authController.getMatches);

module.exports = router;