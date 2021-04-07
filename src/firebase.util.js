import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC9vyymdUTnDHnAWMYSkLGqbiOjXP7Vekg",
  authDomain: "react-test-dashboard-site.firebaseapp.com",
  databaseURL: "https://react-test-dashboard-site.firebaseio.com",
  projectId: "react-test-dashboard-site",
  storageBucket: "react-test-dashboard-site.appspot.com",
  messagingSenderId: "420824157030",
  appId: "1:420824157030:web:e5806794df35282bbd16a7",
  measurementId: "G-WFBHGGBFT7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized
}
firebase.analytics();
export const auth = firebase.auth();
export const db = firebase.firestore();

export const getUser = async (user, additionalData) => {
  if (!user) return;
  var docRef = db.collection("users").doc(`${user.uid}`);
  return docRef;
};

export const addTicketToDB = async (ticket) => {
  await db
    .collection("tickets")
    .add({
      ...ticket,
      createdAt: new Date(),
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  // const collectionRef = db.collection(ticket);
  // const docRef = collectionRef.doc(ticket);
};

export const getTicketsFromDB = () => {
  var tickets = [];
  db.collection("tickets")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tickets.push(doc.data());
      });
    });
  console.log(tickets, "tickets");
  return tickets;
};
