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

export const addTicketToDB = async (ticket, owner) => {
  var newDocRef = db.collection("tickets").doc();
  newDocRef.set({
    ...ticket,
    createdAt: new Date(),
    owner: owner.uid,
    id: newDocRef.id,
    chats: [],
  });

  console.log(newDocRef.id);
};

export const getTicketsFromDB = () => {
  console.log("getTicketsFromDB Fired");
  var tickets = [];
  db.collection("tickets")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc, index) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tickets.push(doc.data());
      });
    });
  console.log(tickets, "tickets");
  return tickets;
};

export const getTicketsFromDBUser = (user) => {
  console.log("getTicketsFromDBUser Fired");
  var tickets = [];
  db.collection("tickets")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        if (doc.data().owner === user.uid) tickets.push(doc.data());
      });
    });
  console.log(tickets, "tickets");
  return tickets;
};

export const messageSend = (ticketID, message, owner) => {
  var ticketRef = db.collection("tickets").doc(ticketID);

  ticketRef.update({
    chats: firebase.firestore.FieldValue.arrayUnion({
      message: message,
      owner: owner,
      id: Math.floor(Math.random() * 10 + 1),
    }),
  });

  // Set the "capital" field of the city 'DC'
  // return
};

export const getChatFromDB = async (ticketID) => {
  var chats = null;
  var docRef = db.collection("tickets").doc(ticketID);
  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        chats = doc.data().chats;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  return chats;
};
