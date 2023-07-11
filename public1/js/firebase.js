
var firebaseConfig = {
    apiKey: "AIzaSyC5EixfGA2pBAb40vqw-TxFXc0PvE-l2Qg",
    authDomain: "blogish-e8388.firebaseapp.com",
    projectId: "blogish-e8388",
    storageBucket: "blogish-e8388.appspot.com",
    messagingSenderId: "713772594188",
    appId: "1:713772594188:web:b395bfc7dd68e557066a29"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var auth=firebase.auth();
const logoutUser=()=>{
    auth.signOut();
    location.reload();

}