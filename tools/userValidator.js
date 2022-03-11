const validator = require("validator");

function validate(req) {
  // console.log(req.file);
  // console.log(req.file.mimetype);
  if (
    !req.body.fName ||
    !req.body.lName ||
    !req.body.userName ||
    !req.body.password ||
    !req.body.phoneNumber ||
    !req.file
  ) {
    return {
      success: false,
      msg: "همه فیلد ها باید پر شده باشه",
    };
  }

  const fileSizeInMegabytes = req.file.size / (1024 * 1024);

  if (!(fileSizeInMegabytes < 2)) {
    return {
      success: false,
      msg: "عکس ارسالی حداکثر باید 2 مگابایت باشد",
    };
  }

  if (!req.file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return {
      success: false,
      msg: "فرمت عکس قابل قبول نیست",
    };
  }

  if (!(req.body.fName.length >= 3 || req.body.fName.length <= 50)) {
    return {
      success: false,
      msg: "نام باید حداقل 3 حرف و حداکثر 50 حرف باشد",
    };
  }

  if (!(req.body.lName.length >= 2 || req.body.lName.length <= 50)) {
    return {
      success: false,
      msg: "نام خانوادگی باید حداقل 2 حرف و حداکثر 50 حرف باشد",
    };
  }

  if (
    !req.body.password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    )
  ) {
    return {
      success: false,
      msg: "رمز عبور باید حداقل 8 حرف، متشکل از اعداد و دارای حداقل یک حرف بزرگ انگلیسی باشد",
    };
  }

  if (!validator.isMobilePhone(req.body.phoneNumber, "fa-IR")) {
    return {
      success: false,
      msg: "شماره تلفن را درست وارد کنید!",
    };
  }

  return {
    success: true,
  };
}

module.exports = validate;
