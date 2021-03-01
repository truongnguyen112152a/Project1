showAllData()
// biến lưu STT
let stt = 1
// lưu sự thay đổi khi tạo mới data
var arrAdd = [1]
// số lượng data trên một trang
let numPage = 7
// số page trên một Tab
let pageTab = 4
// tổng số Tab
let arrTab = [1]
// lưu tổng số trang
let totalPage = [1]
// lưu số trang hiện tại
let arrCurrentPage = [1, 0]
// lưu số trang hiện tại để Next
let arrNext = [1, 1]
// lưu số trang hiện tại để Back
let arrBack = [1, 1]

// lấy toàn bộ data
function showAllData() {
    $.ajax({
        url: "/user",
        method: "GET"
    })
        .then((data) => {
            countData(data.value.length)
            
            let sumPage = Math.ceil(data.value.length / 7)
            if(totalPage.length >= 2) totalPage.pop()
            totalPage.push(sumPage)
            numPageOnTab(totalPage[1])
            if(arrTab.length >= 2) arrTab.pop()
            let totalTab = Math.ceil(sumPage / pageTab)
            arrTab.push(totalTab)
            $("#list-user").empty()
            stt = 1
            if (!data.error) {
                for (i in data.value) {
                    $("#list-user").append(
                        `
                        <tr class="table-primary">
                            <th id="stt" scope="row">${stt++}</th>
                            <td>${data.value[i].email}</td>
                            <td>${data.value[i].username}</td>
                            <td>${data.value[i].password}</td>
                            <td>
                                <button onclick=myDetail('${data.value[i]._id}') type="button" class="btn btn-warning">Chi tiết</button>
                            </td>
                        </tr>
                    `
                    )
                    if (stt === (numPage + 1)) return null
                }
            }
        }).catch((err) => {
            alert(err)
        });
}

// hiển thị theo số trang
function showDataOfPage() {
    $.ajax({
        url: "/user/" + arrCurrentPage[1],
        method: "GET"
    })
        .then((data) => {
            $("#list-user").empty()
            stt = arrCurrentPage[1] * numPage - numPage + 1
            if (!data.error) {
                for (i in data.value) {
                    $("#list-user").append(
                        `
                            <tr class="table-primary">
                                <th id="stt" scope="row">${stt++}</th>
                                <td>${data.value[i].email}</td>
                                <td>${data.value[i].username}</td>
                                <td>${data.value[i].password}</td>
                                <td>
                                    <button onclick=myDetail('${data.value[i]._id}') type="button" class="btn btn-warning">Chi tiết</button>
                                </td>
                            </tr>
                        `
                    )
                }
            }
        }).catch((err) => {
            alert(err)
        });
}

// thêm số trang

function numPageOnTab(data) {
    $(".number-page").empty()
    let i = 1
    let z = 5
    if(data !== totalPage[1]) {
        i = data  
        z = i + 4
        if(z > totalPage[1]) z = totalPage[1] + 1
    }
    for ( i; i < z; i++) {
        $(".number-page").append(
            `
            <button id="idBtn" type="button" class="btn btn-outline-secondary" onclick="myPage.call(this)">${i}</button>
            `
        )
    }
    if(data === totalPage[1]) {
        $(".number-page button:first").addClass("bg-button")
    }
}
// Back,Next số trang

// đếm số lần Next,Back
let count1 = [1, 0]
function myBack() {
    if(count1[1] <= 0) return null
    if(count1[1] > 0) {
        let x = count1[1]
        count1.pop() 
        x--
        count1.push(x)
        currentPage(x * 4 + pageTab)
        numPageOnTab(x * 4 + 1)
        showDataOfPage()
        return checkButtonBack()
    } 
    return null
}
function myNext() {
    if(count1[1] >= arrTab[1] -1) return null
    if(count1[1] < arrTab[1] - 1) {
        console.log(count1[1]);
        let x = count1[1]
        count1.pop()
        x++
        count1.push(x)
        currentPage(x * 4 + 1)
        numPageOnTab(x * 4 + 1)
        showDataOfPage()
        return checkButtonNext()
    }
    return null
}

// vị trí button đầu tiên của trang hiện tại
function currentPage(data) {
    arrCurrentPage.pop()
    if (arrCurrentPage.length > 2) return null
    return arrCurrentPage.push(data)
}

// chuyển trang
function myPage() {
    removeCssBtn()
    let numPage = $(this).text()
    currentPage(numPage)
    return showDataOfPage()
}

// chuyển đến trang detail
function myDetail(data) {
    window.location.href = "/detail/" + data
}

// tạo mới data
function sumArr(data) {
    if (data.length === 2) data.pop()
    if (data.length > 2) return 1
    return data.push(2)
}
function subArr(data) {
    if (data.length === 2) return data.pop()
}
// chọn thay đổi
function toAdd() {
    if (arrAdd.length !== 2) {
        $("#int-email").val("")
        $("#int-username").val("")
        $("#int-phone").val("")
        $("#int-school").val("")
        $("#int-password").val("")
    }
}
// click thay đổi trên ô modal
function doneAdd() {
    let email = $("#int-email").val()
    let username = $("#int-username").val()
    let phone = $("#int-phone").val()
    let school = $("#int-school").val()
    let password = $("#int-password").val()
    if (!(email && username && phone && school && password)) {
        alert("không được để trống")
        return sumArr(arrAdd)
    }
    if (!(((!isNaN(phone)) && typeof Number(phone) === "number") &&
        ((!isNaN(password)) && typeof Number(password) === "number"))) {
        alert("phone và password phải là số")
        return sumArr(arrAdd)
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
                showDataOfPage()
                return subArr(arrAdd)
            }
            alert("email này đã tồn tại")
            return sumArr(arrAdd)
        }).catch((err) => {
            alert(err)
        });
}

// thoát về login
$("#idBtnBack").click(() => {
    if (confirm("Bạn có muốn thoát hay không?")) {
        window.location.href = "/login"
    }
})

// trang trí button

function checkButtonNext() {
    $(".number-page button:first").addClass("bg-button")
}
function checkButtonBack() {
    $(".number-page button:last").addClass("bg-button")
}

function removeCssBtn() {
    $("* #idBtn").removeClass("bg-button")
}
// tạo tự động data
let arrCount = [1]
function countData(data) {
    if (arrCount.length === 2) arrCount.pop()
    return arrCount.push(data)
}
function autoData() {
    for (let i = arrCount[1] + 1; i < (arrCount[1] + 10); i++) {
        let email = `truong${i}@gmail.com`
        let username = `truong${i}`
        let phone = i
        let school = `đại học ${i}`
        let password = i
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
                    return showDataOfPage()
                }
                alert("tạo tự động data")
                return window.location.href = window.location.href
            }).catch((err) => {
                alert(err)
            });
    }

}