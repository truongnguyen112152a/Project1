let x = 1
showData()
function showData() {
    $.ajax({
        url: "/user",
        method: "GET"
    })
        .then((data) => {
            $("#list-user").empty()
            x = 1
            if (!data.error) {
                for (i in data.value) {
                    $("#list-user").append(
                        `
                            <tr class="table-primary">
                                <th id="stt" scope="row">${x++}</th>
                                <td>${data.value[i].email}</td>
                                <td>${data.value[i].username}</td>
                                <td>${data.value[i].password}</td>
                                <td>
                                    <button onclick=myDetail('${data.value[i]._id}') type="button" class="btn btn-warning">Chi tiết</button>
                                </td>
                            </tr>
                        `
                    )
                    if(x === 8) break;
                }
            }
        }).catch((err) => {
            alert(err)
        });
}
function myDetail(data) {
    window.location.href = "/detail/" + data
}
var arrChange = [1]
function sumArr(data) {
    if(data.length === 2) data.pop()
    if(data.length > 2) return 1
    return data.push(2)
}
function toChange() {
    if(arrChange.length !== 2) {
        $("#int-email").val("")
        $("#int-username").val("")
        $("#int-phone").val("")
        $("#int-school").val("")
        $("#int-password").val("")
    }
}
function change(data) {
    return alert(data)
}
function doneChange(data) {
    let email = $("#int-email").val()
    let username = $("#int-username").val()
    let phone = $("#int-phone").val()
    let school = $("#int-school").val()
    let password = $("#int-password").val()
    if (!(email && username && phone && school && password)) {
        alert("không được để trống")
        return sumArr(arrChange)
    }
    if (!(((!isNaN(phone)) && typeof Number(phone) === "number") &&
        ((!isNaN(password)) && typeof Number(password) === "number"))) {
        alert("phone và password phải là số")    
        return sumArr(arrChange)
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
                alert("tạo dữ liệu thành công")
                return showData()
            }
            alert("email này đã tồn tại")
            return sumArr(arrChange)
        }).catch((err) => {
            alert(err)
        });
}
$("#idBtnBack").click(() => {
    if(confirm("Bạn có muốn thoát hay không?")) {
        window.location.href = "/sign-up"
    }
})