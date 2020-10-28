function validatePassword(password) {
    let errors = []
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters.")
    }
    if (password === password.toUpperCase()) {
        errors.push("Password must contain at least 1 lowercase character.")
    }
    if (password === password.toLowerCase()) {
        errors.push("Password must contain at least 1 uppercase character.")
    }
    if (!/\d/.test(password)) {
        errors.push("Password must contain at least 1 number.")
    }
    if (!/\W/.test(password)) {
        errors.push("Password must contain at least 1 special character.")
    }
    return errors
}

export default validatePassword