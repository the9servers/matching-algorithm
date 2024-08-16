const { Router } = require('express');
const authController = require("../controllers/authController");
const bodyParser = require ("body-parser");

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = Router();

router.get("/match", authController.finalMatch);

module.exports = router;