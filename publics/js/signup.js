function mySignUp() {
    var intEmail = $("#intEmail").val()
    var intPassword = $("#intPassword").val()
    if(intEmail && intPassword) {
        return $.ajax({
            url: `/user/sign-up/${intEmail}/${intPassword}`,
            method: "GET"
        })
        .then((data) => {
            if(!data.error) {
                alert("Đăng nhập thành công")
                return window.location.href = "/home"
            }
            alert("sai tài khoản hoặc mật khẩu")
            if(confirm("bạn có muốn đăng ký") == true) {
                return window.location.href = "/login"
            }
        }).catch((err) => {
            alert(err)
        });
    }
    return alert("không được để trống")
}
function myLogin() {
    window.location.href = "/login"
}