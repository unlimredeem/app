const mangoose = require("mongoose");

mangoose.connect("mongodb+srv://shauryaprabhakar097_db_user:dark07@practicedb.smpij9v.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mangoose.Schema({
  username: String,
  email: String,
  password: String,
  qualification: String,
  countryCode: Number,
  phone: Number
});

module.exports = mangoose.model("User", userSchema);

