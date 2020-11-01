import firebase from 'firebase' ;

var firebaseConfig = {
    apiKey: "AIzaSyAfhXd5GFcfXTHllBMgLkynq_1yjPnz7Y8",
    authDomain: "quiz-application-d1699.firebaseapp.com",
    databaseURL: "https://quiz-application-d1699.firebaseio.com",
    projectId: "quiz-application-d1699",
    storageBucket: "quiz-application-d1699.appspot.com",
    messagingSenderId: "457794478335",
    appId: "1:457794478335:web:b8bc4f0a66150c3856ecca"
  };
 const fire =  firebase.initializeApp(firebaseConfig);

 export default fire ;