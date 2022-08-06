var firebaseConfig = {
  apiKey: "AIzaSyA4pSIU7eSoIdKqKahvN_aOWfGu405hVSQ",
  authDomain: "kwitter-ad14c.firebaseapp.com",
  databaseURL: "https://kwitter-ad14c-default-rtdb.firebaseio.com",
  projectId: "kwitter-ad14c",
  storageBucket: "kwitter-ad14c.appspot.com",
  messagingSenderId: "385673983065",
  appId: "1:385673983065:web:66a2e39ba19a7809762d48",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("user_name");
console.log(user_name);
function send() {
  Message = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: Message,
    like: 0
  });
  document.getElementById("msg").innerHTML = " ";
}

function getData() {
  firebase
    .database()
    .ref("/" + room_name)
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        if (childKey != "purpose") {
          firebase_message_id = childKey;
          message_data = childData;
          //Start code
          console.log(firebase_message_id);
          console.log(message_data);
          name = message_data["name"];
          message = message_data["message"];
          like = message_data["like"];
          name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>"  
          message_with_tag = "<h4 class='message_h4'>" + message + "</h4>"
          like_btn = "<button class='btn btn-warning' id="+ firebase_message_id + " value="+like+" onclick='updateLike(this.id)'>";
          span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> like:"+like+"</span> </button> <hr>"
          row = name_with_tag + message_with_tag + like_btn + span_with_tag
          document.getElementById("output").innerHTML += row
          
          //End code
        }
      });
    });
}
getData();
function updateLike(message_id){
      console.log("Clicked on like button" + message_id)
      button_id = message_id
      likes = document.getElementById(button_id).value
      updated_likes = Number(likes)+1
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      })
}
function logout(){
      localStorage.removeItem("room_name")
      localStorage.removeItem("user_name")
      window.location = "index.html"
}
