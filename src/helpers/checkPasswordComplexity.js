function validatePassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (password === password.toUpperCase()) {
    return "Password must contain at least 1 lowercase character.";
  }
  if (password === password.toLowerCase()) {
    return "Password must contain at least 1 uppercase character.";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least 1 number.";
  }
  if (!/\W/.test(password)) {
    return "Password must contain at least 1 special character.";
  }
}

export default validatePassword;
