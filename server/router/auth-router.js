const express = require('express');
const router = express.Router();
const authcontrollers = require('../controllers/auth-controller');
const validate = require("../middlewares/validate-middleware");
const {signupSchema,loginSchema,contactSchema} = require("../validators/auth-validator");

router.route("/register").post(validate(signupSchema), authcontrollers.register);

router.route("/login").post(validate(loginSchema), authcontrollers.login);

router.route("/contact").post(validate(contactSchema), authcontrollers.contactUs);

module.exports = router;