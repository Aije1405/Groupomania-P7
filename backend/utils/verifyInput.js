//vérification des inputs des users
module.exports = {
    validEmail: function (value) {
        const regexEmail = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;
        return regexEmail.test(value)
    },
    validPassword: function (value) {
        //8 caractères dont au minimum une majuscule, une minuscule et un caractère numérique
        const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})/
        return regexPassword.test(value)
    },
    validFirstname: function (value) {
        const firstnameRegex = /^[a-zA-Z ,.'-]+$/;
        return firstnameRegex.test(value)
    },
    validLastname: function (value) {
        const lastnameRegex = /^[a-zA-Z ,.'-]+$/;
        return lastnameRegex.test(value)
    },
    validPosition: function (value) {
        const positionRegex = /^[a-zA-Z ,.'-]+$/;
        return positionRegex.test(value)
    },
    validDepartment: function (value) {
        const departmentRegex = /^[a-zA-Z ,.'-]+$/;
        return departmentRegex.test(value)
    },
}
