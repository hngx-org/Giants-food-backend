const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("password must be at least 8 characters");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      "password must contain at least 1 letter and 1 number"
    );
  }
  return value;
};

const dateOfBirth = (value, helpers) => {
  if (value.length < 10 || value.length > 10) {
    return helpers.message("Date of birth should follow format YYYY-MM-DD");
  }
  const dobArr = value.split("-");
  if (dobArr.length != 3) {
    return helpers.message(
      "Total - Date of birth should follow format YYYY-MM-DD"
    );
  }
  if (dobArr[0]?.length != 4 || Number(dobArr) < 1900) {
    return helpers.message(
      "Year - Date of birth should follow format YYYY-MM-DD"
    );
  }
  if (dobArr[1]?.length != 2 || Number(dobArr) < 0) {
    return helpers.message(
      "Month - Date of birth should follow format YYYY-MM-DD"
    );
  }
  if (dobArr[2]?.length != 2 || Number(dobArr) < 0) {
    return helpers.message(
      "Day - Date of birth should follow format YYYY-MM-DD"
    );
  }
  return value;
};

module.exports = {
  objectId,
  password,
  dateOfBirth,
};
