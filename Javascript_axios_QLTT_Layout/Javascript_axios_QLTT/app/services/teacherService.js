function TeacherService(){
this.getListTeacherApi = function (){
    return axios({
        url:"https://6388cedaa4bb27a7f7924897.mockapi.io/api/Teacher",
        method: "GET",
    });
};

this.deleteTeacherApi = function(id){
    return axios({
        url:`https://6388cedaa4bb27a7f7924897.mockapi.io/api/Teacher/${id}`,
        method: "DELETE",
    });
}

this.addTeacherApi = function(teacher){
    return axios({
        url: "https://6388cedaa4bb27a7f7924897.mockapi.io/api/Teacher",
        method: "POST",
        data: teacher,
    })
}

//Lấy thông tin dựa vào id nên phải có id truyền vô
this.getTeacherByIdApi = function(id){
    return axios({
        url: `https://6388cedaa4bb27a7f7924897.mockapi.io/api/Teacher/${id}`,
        method: "GET",
    })
}

this.updateTeacherApi = function(teacher){
    return axios({
        url: `https://6388cedaa4bb27a7f7924897.mockapi.io/api/Teacher/${teacher.id}`,
        method: "PUT",
        data: teacher,
    })
}
}