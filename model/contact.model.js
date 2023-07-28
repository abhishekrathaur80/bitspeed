const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
  },
  linkedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
    index: true,
  },
  linkPrecedence: {
    type: String,
    enum: ["primary", "secondary"],
    default: "primary",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
