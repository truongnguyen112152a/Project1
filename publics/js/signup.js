function mySignUp() {
    let email = $("#int-email").val()
    let username = $("#int-username").val()
    let phone = $("#int-phone").val()
    let school = $("#int-school").val()
    let password = $("#int-password").val()
    if (!(email && username && phone && school && password)) {
        return alert("không được để trống")
    }
    if (!(((!isNaN(phone)) && typeof Number(phone) === "number") &&
        ((!isNaN(password)) && typeof Number(password) === "number"))) {
        return alert("phone và password phải là số")
    }
    $.ajax({
        url: "/user",
        method: "POST",
        data: {
            email,
            username,
            phone,
            school,
            password
        }
    })
        .then((data) => {
            if (!data.error) {
                alert("tạo tài khoản thành công")
                return window.location.href = "/login"
            }
            alert("email này đã tồn tại")
        }).catch((err) => {
            alert(err)
        });
}