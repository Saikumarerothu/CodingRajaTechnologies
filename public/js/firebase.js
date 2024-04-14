// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAKqA1D4AXS874LI507FSgRlbjSsM8ZBhA",
    authDomain: "blogging-website-ac599.firebaseapp.com",
    projectId: "blogging-website-ac599",
    storageBucket: "blogging-website-ac599.appspot.com",
    messagingSenderId: "482177055900",
    appId: "1:482177055900:web:e6396a498a50c6f1c6c159"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();
  var auth=firebase.auth();
  const logoutUser = () =>
  {
    auth.signOut();
    location.reload();
  }