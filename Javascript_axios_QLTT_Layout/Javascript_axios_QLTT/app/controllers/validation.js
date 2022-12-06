function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
        if (value === "") {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }

        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
        return true;
    };

    this.kiemTraDoDaiKyTu = function (value, errorId, mess, min, max) {
        if (min <= value.trim().length && value.trim().length <= max) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };

    this.kiemTraChuoiKitu = function (value, errorId, mess) {
        var letter =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };

    this.checkPassword = function (validate, errorID, mess) {
        var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
        if (validate.match(pass)) {
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        } else {
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "block";
            return false;
        }
    }

    this.kiemTraEmail = function (value, errorId, mess) {
        var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(letter)) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };

    this.kiemTraChonOption = function (idSelect, errorId, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };

    this.kiemTraTrungMaSV = function (value, errorId, mess, data) {
        var exist = false;
        for (var i = 0; i < data.length; i++) {
            var sv = data[i];
            if (sv.maSV === value) {
                exist = true;
                break;
            }
        }

        if (exist) {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }

        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
        return true;
    };
}