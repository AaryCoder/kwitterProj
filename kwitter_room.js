var firebaseConfig = {
      apiKey: "AIzaSyA4pSIU7eSoIdKqKahvN_aOWfGu405hVSQ",
      authDomain: "kwitter-ad14c.firebaseapp.com",
      databaseURL: "https://kwitter-ad14c-default-rtdb.firebaseio.com",
      projectId: "kwitter-ad14c",
      storageBucket: "kwitter-ad14c.appspot.com",
      messagingSenderId: "385673983065",
      appId: "1:385673983065:web:66a2e39ba19a7809762d48"
    };
    
    // Initialize Firebase
     firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name")
document.getElementById("user_name").innerHTML = "Welcome, " + user_name


function addRoom(){
      room = document.getElementById("room_name").value
      addData(room)
      localStorage.setItem("room_name", room)
}

function addData(_data){
      firebase.database().ref("/").child(_data).update({
            purpose:"addingData"
        })
}

function getData() {
      firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      row = "<div class='room_name' id="+Room_names+" onclick = 'redirectToRoomname(this.id)'>#"+Room_names + "</div> <hr>";
      document.getElementById("output").innerHTML += row
      
      });});}
getData();
function redirectToRoomname(room1){
      localStorage.setItem("room_name", room1)
      window.location="kwitter_page.html"
}

function logout(){
      localStorage.removeItem("room_name")
      localStorage.removeItem("user_name")
      window.location = "index.html"
}
