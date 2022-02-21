const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      minlength: [3, "نام باید حداقل 3 حرف باشه"],
      maxlength: [50, "نام نمیتونه بیشتر از 50 حرف باشه"],
    },
    lName: {
      type: String,
      required: true,
      minlength: [2, "نام خانوادگی باید حداقل 2 حرف باشه"],
      maxlength: [50, "نام خانوادگی نمیتونه بیشتر از 50 حرف باشه"],
    },
    userName: {
      type: String,
      required: true,
      trim: true, //because the client can't use space for username firstName and lastName
      minLength: [3, "نام کاربری باید حداقل 3 حرف باشه"],
      maxLength: [30, "نام کاربری نباید بیشتر از 30 حرف باشه"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "رمز عبور حداقل باید 8 رقم باشه"],
    },
    photo: String,
    role: {
      type: String,
      enum: ["blogger", "admin"],
      required: true,
      default: "blogger",
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: (number) => {
        validator.isMobilePhone(number, "fa-IR");
      },
    },
    gender: {
      type: String,
      enum: ["مرد", "زن"],
      required: [true, "باید یا مرد باشی یا زن"],
      default: "مرد",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const blogger = this._doc;

  if (this.isNew || this.isModified("password")) {
    const salt = bcrypt.genSalt(10);
    salt
      .then((salt) => {
        return bcrypt.hash(blogger.password, salt);
      })
      .then((hash) => {
        blogger.password = hash;
        return next();
      })
      .catch((err) => console.log(err));
  }
});

// userSchema.pre("findOneAndUpdate", function (next) {
//   const blogger = this._doc;

// const salt = bcrypt.genSalt(10);
// salt
//   .then((salt) => {
//     return bcrypt.hash(blogger.password, salt);
//   })
//   .then((hash) => {
//     blogger.password = hash;
//     return next();
//   })
//   .catch((err) => console.log(err));
// });

module.exports = mongoose.model("User", userSchema);
