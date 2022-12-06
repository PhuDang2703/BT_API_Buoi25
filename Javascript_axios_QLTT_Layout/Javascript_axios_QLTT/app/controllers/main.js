//Global
var teacherService = new TeacherService();
var validation = new Validation();


function getEle(id) {
    // return document.getElementById = id;
    // cũ
    return document.getElementById(id);
    //sai dong nay
}

function getListTeacher() {
    teacherService
        .getListTeacherApi()
        .then(function (result) {
            renderHTML(result.data);
        })
        .catch(function (error) {
            console.log(error)
        })
        ;
}

getListTeacher();

function renderHTML(data) {
    var content = "";
    data.forEach(function (teacher, index) {
        content += `
        <tr>
        <td>${index + 1}</td>
        <td>${teacher.taiKhoan}</td>    
        <td>${teacher.hoTen}</td>
        <td>${teacher.matKhau}</td>
        <td>${teacher.email}</td>
        <td>${teacher.ngonNgu}</td>
        <td>${teacher.loaiND}</td>
        <td>${teacher.moTa}</td>
        <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editTeacher('${teacher.id
            }')">Edit</button>

                <button class="btn btn-danger" onclick="deleteTeacher('${teacher.id
            }')">Delete</button>
            </td>
        </tr>
        `;
    });
    getEle("tblDanhSachNguoiDung").innerHTML = content;
}


//Add teacher
getEle('btnThemNguoiDung').onclick = function () {
    var title = "Thêm giảng viên";
    document.getElementsByClassName("modal-title")[0].innerHTML = title;

    var button = `<button class="btn btn-success" onclick="addTeacher()">Thêm giảng viên</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = button;
}

function addTeacher() {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var loaiND = getEle('loaiNguoiDung').value;
    var ngonNgu = getEle('loaiNgonNgu').value;
    var moTa = getEle('MoTa').value;
    

    //flag: cờ hiệu
    var isValid = true; //hợp lệ

    //Check validation
    //Tài khoản
    isValid &= validation.kiemTraRong(taiKhoan, 'errorTaiKhoan', "(*) Vui lòng nhập tài khoản");

    //Họ tên
    isValid &= validation.kiemTraRong(hoTen, 'errorHoTen', "(*) Vui lòng nhập họ tên")&&
    validation.kiemTraChuoiKitu(hoTen, 'errorHoTen', "(*) Vui lòng nhập tên dạng chữ");

    //Mật khẩu
    isValid &= validation.kiemTraRong(matKhau, 'errorMatKhau', "(*) Vui lòng nhập mật khẩu")&&
    validation.checkPassword(matKhau, 'errorMatKhau', "(*) Vui lòng nhập đúng định dạng mật khẩu")&&
    validation.kiemTraDoDaiKyTu(matKhau, 'errorMatKhau', "(*) Vui lòng nhập mật khẩu 6-8 kí tự", 6, 8);
    
    //Email
    isValid &= validation.kiemTraRong(email, 'errorEmail', "(*) Vui lòng nhập email")&&
    validation.kiemTraEmail(email, 'errorEmail', "(*) Vui lòng nhập email đúng định dạng");

    //Hình ảnh
    isValid &= validation.kiemTraRong(hinhAnh, 'errorhinhAnh', "(*) Vui lòng nhập hình ảnh");

    //Loại người dùng
    isValid &= validation.kiemTraChonOption('loaiNguoiDung', 'errorLoaiND', "(*) Vui lòng chọn loại người dùng");

    //loại ngôn ngữ
    isValid &= validation.kiemTraChonOption('loaiNgonNgu', 'errorLoaiNgonNgu', "(*) Vui lòng chọn ngôn ngữ");

    //Mô tả
    isValid &= validation.kiemTraRong(moTa, 'errorMoTa', "(*) Vui lòng nhập mô tả")&&
    validation.kiemTraDoDaiKyTu(moTa, 'errorMoTa', "(*) Vui lòng nhập mật khẩu 6-10 kí tự", 1, 60);

    if (!isValid) return;
    var teacher = new Teacher("", taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa);

    
    teacherService.addTeacherApi(teacher)
        .then(function (result) {
            // alert("Thêm thành công");
            getListTeacher();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        })
}


//Edit teacher
function editTeacher(id) {
    var title = "Sửa thông tin";
    document.getElementsByClassName('modal-title')[0].innerHTML = title;

    var button = `<button class="btn btn-warning" onclick="updateInfo(${id})">Update</button>`;
    document.getElementsByClassName('modal-footer')[0].innerHTML = button;

    teacherService.getTeacherByIdApi(id)
        .then(function (result) {
            console.log(result);
            var teacher = result.data;
            getEle("TaiKhoan").value = teacher.taiKhoan;
            getEle("HoTen").value = teacher.hoTen;
            getEle("MatKhau").value = teacher.matKhau;
            getEle("Email").value = teacher.email;
            getEle("loaiNguoiDung").value = teacher.loaiND;
            getEle("loaiNgonNgu").value = teacher.ngonNgu;
            getEle("MoTa").value = teacher.moTa;
        })
        .catch(function (error) {
            console.log(error);
        })
}

//Update
function updateInfo(id) {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var loaiND = getEle('loaiNguoiDung').value;
    var ngonNgu = getEle('loaiNgonNgu').value;
    var moTa = getEle('MoTa').value;

    var teacher = new Teacher(id, taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa);
    teacherService.updateTeacherApi(teacher)
        .then(function () {
            alert("Cập nhật thành công");
            getListTeacher();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        })
}


//Delete teacher
function deleteTeacher(id) {
    teacherService.deleteTeacherApi(id)
        .then(function (result) {
            alert("Xóa thành công");
            getListTeacher();
        })
        .catch(function (error) {
            console.log(error);
        })
}