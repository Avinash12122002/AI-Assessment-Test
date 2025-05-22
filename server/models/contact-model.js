const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//json web token
contactSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        name: this.name,
        email: this.email,
        message: this.message,
        contactId: this._id.toString(),
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
    return error;
  }
};

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
