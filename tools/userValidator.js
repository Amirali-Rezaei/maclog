function validate(req) {
  if (
    !req.body.fName ||
    !req.body.lName ||
    !req.body.userName ||
    !req.body.password ||
    !req.body.phoneNumber
  ) {
    return {
      success: false,
      msg: "همه فیلد ها باید پر شده باشه",
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

  return {
    success: true,
  };
}

module.exports = validate;
