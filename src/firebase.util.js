import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import { NotificationManager } from "react-notifications";

// Basic configuration
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

export const auth = firebase.auth();
export const db = firebase.firestore();

// Function for adding tickets to database
export const addTicketToDB = async (ticket, owner) => {
  var newDocRef = db.collection("tickets").doc();
  newDocRef
    .set({
      ...ticket,
      createdAt: new Date(), // the time ticket has been created
      owner: owner.uid, // Store user's uid so we do'nt show it to other users
      id: newDocRef.id, // Store ticket's own id so we can find it in future
      chats: [],
    })
    .then(() => {
      // If we have stored the ticket successfully, Run notification and reload the page so we can see our new ticket in tickets list
      NotificationManager.success("Ticket Successfully added", "Success");
      window.location.replace(window.location.origin);
    })
    .catch(() => {
      NotificationManager.error("Something Went Wrong", "Error", 5000);
    });
};

// Fetch all the tickets from database (for admin role)
export const getTicketsFromDB = () => {
  var tickets = [];
  db.collection("tickets")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((ticket) => {
        tickets.push(ticket.data());
      });
    });
  return tickets;
};

// Fetch user's the tickets from database (for user role)
export const getTicketsFromDBUser = (user) => {
  var tickets = [];
  db.collection("tickets")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((ticket) => {
        if (ticket.data().owner === user.uid) tickets.push(ticket.data());
      });
    });
  console.log(tickets, "tickets");
  return tickets;
};

// Store message that hase sent in chat box, in database
export const messageSend = (ticketID, message, owner) => {
  var ticketRef = db.collection("tickets").doc(ticketID);
  ticketRef
    .update({
      chats: firebase.firestore.FieldValue.arrayUnion({
        message: message,
        owner: owner,
        id: Math.floor(Math.random() * 100 + 1), // Because arrayUnion updates only if the object is new, we had to generate an id so if message is the same we can save to database
      }),
    })
    .then(() => {
      NotificationManager.success("Message Successfully Sent", "Success");
    });

  // Set the "capital" field of the city 'DC'
  // return
};

export const getChatFromDB = async (ticketID) => {
  var chats = null;
  var docRef = db.collection("tickets").doc(ticketID);
  await docRef
    .get()
    .then((ticket) => {
      if (ticket.exists) {
        chats = ticket.data().chats;
      } else {
        NotificationManager.error("Something Went Wrong", "Error", 5000);
      }
    })
    .catch((error) => {
      NotificationManager.error("Error: " + error, "Error", 5000);
    });
  return chats;
};

export const uploadFiletoDB = (file, ticketID, uid) => {
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef.child(`images/${file.name}`).put(file);
  if (uploadTask.snapshot) {
    uploadTask.on(
      "state_changed",
      () => {},
      () => {
        NotificationManager.error("Something Went Wrong", "Error", 5000);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          messageSend(ticketID, downloadURL, uid);
          NotificationManager.success("File Successfully Uploaded", "Success");
        });
      }
    );
  }
};

export const updateProfileImage = async (imgURL, uid) => {
  await db
    .collection("users")
    .doc(uid)
    .update({
      profileURL: imgURL,
    })
    .then(() => {
      return true;
    });
};

export const deleteTicket = (ticketID) => {
  db.collection("tickets")
    .doc(ticketID)
    .delete()
    .then(() => {
      NotificationManager.success("Ticket Successfully Deleted", "Success");
      window.location.replace(window.location.origin);
    })
    .catch(() => {
      NotificationManager.error("Something Went Wrong", "Error", 5000);
    });
};

export const getUser = (userUid) => {
  return db.collection("users").doc(userUid).get();
};
