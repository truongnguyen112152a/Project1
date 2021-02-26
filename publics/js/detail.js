var urlId = window.location.pathname.split("/detail/")[1]
myDetail()
function myDetail() {
    $("#list-user").empty()
    $.ajax({
        url: "/user/detail/" + urlId,
        method: "GET"
    })
    .then((data) => {
        if(!data.error) {
            $("#list-user").append(
                `
                    <tr class="table-primary">
                        <td class="add-class">${data.value[0].email}</td>
                        <td class="add-class">${data.value[0].username}</td>
                        <td class="add-class">${data.value[0].phone}</td>
                        <td class="add-class">${data.value[0].school}</td>
                        <td class="add-class">${data.value[0].password}</td>
                        <td>
                            <button onclick=myChange('${data.value[0]._id}') id="btn-create" type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal">Thay đổi</button>
                            <button onclick=myDelete('${data.value[0]._id}') type="button" class="btn btn-danger">Xóa</button>
                        </td>
                    </tr>
                `
            )                
        }
    }).catch((err) => {
        alert(err)
    });
}
function myChange() {
    let arrEmail = $(".add-class")
    let arrSum = []
    for(let i = 0; i < arrEmail.length; i++) {
    arrSum.push(arrEmail[i].textContent)
    }
    $("#int-email").val(`${arrSum[0]}`)
    $("#int-username").val(`${arrSum[1]}`)
    $("#int-phone").val(`${arrSum[2]}`)
    $("#int-school").val(`${arrSum[3]}`)
    $("#int-password").val(`${arrSum[4]}`)  
}
function doneChange() {
    let email = $("#int-email").val()
    let username = $("#int-username").val()
    let phone = $("#int-phone").val()
    let school = $("#int-school").val()
    let password = $("#int-password").val()
    if(!(email && username && phone && school && password)) {
        return alert("không được để trống")
    }
    if(!(((!isNaN(phone)) && typeof Number(phone) === "number") &&
    ((!isNaN(password)) && typeof Number(password) === "number"))) {            
        return alert("phone và password phải là số")
    }
    $.ajax({
        url: "/user/" + urlId,
        method: "PUT",
        data: {
            email,
            username,
            phone,
            school,
            password
        }
    })
    .then((data) => {
        if(!data.error) {
            alert("cập nhật dữ liệu thành công")
            return myDetail()
        }
        console.log("ok");
        return alert("email này đã tồn tại")
    }).catch((err) => {
        alert(err)
    });
}
function myDelete() {
    $.ajax({
        url: "/user/" + urlId,
        method: "DELETE"
    })
    .then((data) => {
        if(!data.error) {
            alert("xóa dữ liệu thành công")
            return window.location.href = "/home"
        }
    }).catch((err) => {
        
    });
}
$("#idBtnBack").click(() => {
    window.location.href = "/home"
})