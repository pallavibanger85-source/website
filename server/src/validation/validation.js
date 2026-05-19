export const validName = (name) => {
    const nameRegex = /^[A-Za-z\s]{2,50}$/
    return nameRegex.test(name)
}
export const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}
export const validPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
}
export const validGender = (gender) => {
    if (gender === 'male' || gender === 'female' || gender === 'other') {
        return true
    }
    return false
}