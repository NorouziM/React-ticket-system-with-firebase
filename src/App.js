import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Alert } from "@windmill/react-ui";

import React, { Suspense, useEffect, useState } from "react";

import "./App.css";
import { Spinner } from "./components/Spinner";
import Sidebar from "./components/Sidebar";
import TicketCard from "./components/TicketCard";
import CreateTicket from "./components/CreateTicket";
import { getTicketsFromDB, getTicketsFromDBUser } from "./firebase.util";

import { db } from "./firebase.util";

import { Homepage } from "./pages/Homepage";
import Profile from "./pages/Profile";
import { LoginForm } from "./components/LoginForm";

import { auth } from "./firebase.util";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/userActions";
import Chat from "./pages/Chat";
// Dynamic Imorting with React Lazy

function App(props) {
  const { setCurrentUser, currentUser, history } = props;
  const [tickets, setTickets] = useState([]);
  const [areTicketsReady, setTicketsReady] = useState(false);

  useEffect(() => {
    var unSubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email, "Sign in Successfull");
        var docRef = db.collection("users").doc(`${user.uid}`);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setCurrentUser({
                email: doc.data().email,
                role: doc.data().role,
                uid: user.uid,
              });
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        setCurrentUser({ email: null, role: null, uid: null });
      }
    });

    return function cleanup() {
      unSubscribeFromAuth();
    };
  }, []);
  useEffect(() => {
    console.log(
      "inside useEffect  tickets:",
      tickets,
      "  areTicketsReady",
      areTicketsReady
    );
  }, [tickets, areTicketsReady]);

  const getTickets = () => {
    console.log("getTickets fired");
    if (currentUser?.role) {
      currentUser?.role === "user"
        ? setTickets(getTicketsFromDBUser(currentUser))
        : setTickets(getTicketsFromDB());
    }
    if (tickets) setTicketsReady(true);
  };
  return (
    <div class="h-screen flex">
      <Router>
        <Suspense fallback={<Spinner size={28} />}>
          <Sidebar role={currentUser?.role} setTicketsReady={setTicketsReady} />
          <main
            class="flex-1 bg-gray-200 dark:bg-gray-900 overflow-y-auto transition
		duration-500 ease-in-out"
          >
            <Route exact path={"/"}>
              {currentUser?.email ? <Redirect to="/profile" /> : <LoginForm />}
            </Route>
            {currentUser?.email ? (
              <Route
                path={
                  "/profile/:ticketID/:subject/:name/:owner/:email/:message"
                }
              >
                <Chat />
              </Route>
            ) : null}
            {currentUser?.email ? (
              <Route exact path={"/tickets"}>
                {!areTicketsReady ? getTickets() : null}
                {tickets.length ? (
                  <div>
                    {!areTicketsReady ? (
                      <Spinner size={28} />
                    ) : (
                      tickets.map((ticket) => {
                        return <TicketCard ticket={ticket} />;
                      })
                    )}
                  </div>
                ) : (
                  <Alert
                    className="mt-2 w-1/2 translate-x-1/2	translate-x-1/2"
                    type="danger"
                  >
                    No Tickets Found
                  </Alert>
                )}
              </Route>
            ) : null}
            {currentUser?.email ? (
              <Route exact path={"/createTicket"}>
                <CreateTicket setTicketsReady={setTicketsReady} />
              </Route>
            ) : null}
            <Route exact path={"/profile"}>
              <Profile />
            </Route>
          </main>
        </Suspense>
      </Router>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
