// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC8FdNrAxNMazFcCgeTlbCZ_xrSw6JoRwc",
  authDomain: "testing-password-with-info.firebaseapp.com",
  projectId: "testing-password-with-info",
  storageBucket: "testing-password-with-info.appspot.com",
  messagingSenderId: "106238843238",
  appId: "1:106238843238:web:906d27d528380a09bb90a7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database()

function save() {
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  var username = document.getElementById('username').value
  var say_something = document.getElementById('say_something').value
  var favourite_food = document.getElementById('favourite_food').value

  database.ref('users/' + username).set({
    email : email,
    password : password,
    username : username,
    say_something : say_something,
    favourite_food : favourite_food
  })

  alert('Saved')
}

function get() {
  var username = document.getElementById('username').value

  var user_ref = database.ref('users/' + username)
  user_ref.on('value', function(snapshot) {
    var data = snapshot.val()

    alert(data.email)

  })

}

function getAll() {
  var users_ref = database.ref('users');
  var result = "";
  users_ref.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var child_data = childSnapshot.val();
        result += child_data.username + "\n";
        result += " - Email:          ";
        var email_max_blocked = child_data.email.indexOf("@");
        if(email_max_blocked == -1){
          email_max_blocked = child_data.email.length;
        }
        else{
          email_max_blocked += 1;
        }
        result += child_data.email.substring(0,1);
        if(email_max_blocked > 2){
          for(var i = 0; i < email_max_blocked-2; i++){
            result += "*";
          }
          result += child_data.email.substring(email_max_blocked-2,email_max_blocked-1);
        }
        else{
          result += "*";
        }
        if(email_max_blocked == child_data.email.length){
          result += "@gmail.com";
        }
        else{
          result += child_data.email.substring(email_max_blocked-1);
        }
        result += "\n";
        result += " - Password:       ";
        for(var i = 0; i < child_data.password.length; i++){
          result += "*";
        }
        result += "\n";
        result += " - Say-Something:  " + child_data.say_something + "\n";
        result += " - Favourite-Food: " + child_data.favourite_food + "\n";
        console.log(result);
      });
  });
  document.getElementById("results").innerText=result;
}

function update() {
  var username = document.getElementById('username').value
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value

  var updates = {
    email : email,
    password : password
  }

  database.ref('users/' + username).update(updates)

  alert('updated')
}

function remove() {
  var username = document.getElementById('username').value
  var password_new = document.getElementById('password').value

  var user_ref = database.ref('users/' + username)
  user_ref.on('value', function(snapshot) {
    var data = snapshot.val()

    if(data.password == password_new){
      user_ref.remove()

      alert('deleted')
    }

  })

}