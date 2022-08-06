function login(){
    username = document.getElementById("name").value
    localStorage.setItem("user_name", username)
    getname=localStorage.getItem("user_name")
    console.log(getname)
    window.location = "kwitter_room.html"
}