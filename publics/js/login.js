function myLogin() {
    var email = $("#intEmail").val()
    var password = $("#intPassword").val()
    if(email && password) {
        return $.ajax({
            url: "/user/login",
            method: "POST",
            data: {
                email,
                password
            }
        })
        .then((data) => {
            if(!data.error) {
                alert("Đăng nhập thành công")
                return window.location.href = "/home"
            }
            alert("sai tài khoản hoặc mật khẩu")
            if(confirm("bạn có muốn đăng ký") == true) {
                return window.location.href = "/sign-up"
            }
        }).catch((err) => {
            alert(err)
        });
    }
    return alert("không được để trống")
}
function mySignUp() {
    window.location.href = "/sign-up"
}