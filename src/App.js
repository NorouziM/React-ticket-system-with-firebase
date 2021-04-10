import React, { Suspense, useEffect, useState } from "react";
//Styling
import "./App.css";
import "react-notifications/lib/notifications.css";
import { Alert } from "@windmill/react-ui";
//Reacr Router
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
//Notifications
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
//Pages
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
//Components
import Spinner from "./components/Spinner";
import Sidebar from "./components/Sidebar";
import TicketCard from "./components/TicketCard";
import CreateTicket from "./components/CreateTicket";
import LoginForm from "./components/LoginForm";
//Firebse related
import {
  getTicketsFromDB,
  getTicketsFromDBUser,
  getUser,
  auth,
} from "./firebase.util";

// Redux related
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/userActions";

// Dynamic Imorting with React Lazy

function App({ setCurrentUser, currentUser }) {
  const [tickets, setTickets] = useState([]); // Keeping Tickets that recieved from database
  const [areTicketsReady, setTicketsReady] = useState(false); // state for determining whether tickets are completely fetched from database or not

  useEffect(() => {
    var unSubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user successfully loged in
        NotificationManager.success("Logged in Successfully", "Success"); // Show notification of success

        //Get User info from databbase and set it to redux state
        getUser(user.uid)
          .then((userFromDB) => {
            if (userFromDB.exists) {
              setCurrentUser({
                email: userFromDB.data()?.email,
                role: userFromDB.data()?.role,
                uid: user.uid,
                profileURL: userFromDB.data()?.profileURL,
              });
            } else {
              // userFromDB.data() will be undefined in this case
              NotificationManager.error("Something Went Wrong", "Error", 5000);
            }
          })
          .catch((error) => {
            NotificationManager.error("Error: " + error, "Error", 5000);
          });
      } else {
        //User signed out
        setCurrentUser({ email: null, role: null, uid: null });
      }
    });

    return function cleanup() {
      // After component unmounted
      unSubscribeFromAuth();
    };
  }, [setCurrentUser]);

  useEffect(() => {
    console.log(currentUser, "currentUser");
  }, [currentUser]);

  // Get tickets depending on user role
  const getTickets = () => {
    console.log("getTickets fired");
    if (currentUser?.role) {
      // if he is admin get all of the tickets
      currentUser?.role === "user"
        ? setTickets(getTicketsFromDBUser(currentUser))
        : setTickets(getTicketsFromDB());
    }
    // If you ger the tickets set the state so we know tickets are ready to be shown
    if (tickets) setTicketsReady(true);
  };
  return (
    <div className="h-screen flex">
      <Router>
        <Suspense fallback={<Spinner size={28} />}>
          <Sidebar role={currentUser?.role} setTicketsReady={setTicketsReady} />
          <main
            className="flex-1 bg-gray-200 overflow-y-auto transition
		duration-500 ease-in-out"
          >
            <Route exact path={"/"}>
              {
                // If user is logged in don;t show login form and redirect to Profile page
                currentUser?.email ? <Redirect to="/profile" /> : <LoginForm />
              }
            </Route>
            {currentUser?.email ? (
              // Declaring chat page url with url params , Don't show the route to not logged in users
              <Route
                path={
                  "/profile/:ticketID/:subject/:name/:owner/:email/:message"
                }
              >
                <Chat />
              </Route>
            ) : null}
            {currentUser?.email ? (
              // First check if Tickets are ready and fetched and if not go and fetch them
              <Route exact path={"/tickets"}>
                {!areTicketsReady ? getTickets() : null}
                {tickets.length ? (
                  <div>
                    {
                      // while we are waiting to fetching tickets get completed we render spinner component
                      !areTicketsReady ? (
                        <Spinner className="mr-12" size={28} />
                      ) : (
                        tickets.map((ticket) => {
                          return <TicketCard ticket={ticket} />;
                        })
                      )
                    }
                  </div>
                ) : (
                  <Alert className="mt-2 w-1/2 center-alert" type="danger">
                    No Tickets Found
                  </Alert>
                )}
              </Route>
            ) : null}
            {currentUser?.email ? (
              <Route exact path={"/createTicket"}>
                <CreateTicket />
              </Route>
            ) : null}
            <Route exact path={"/profile"}>
              {!areTicketsReady ? getTickets() : null}
              <Profile tickets={tickets} areTicketsReady={areTicketsReady} />
            </Route>
          </main>
        </Suspense>
      </Router>
      <NotificationContainer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)), // setCurrentUser action that we used after geting user data from database
});
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser, // Pull current user from redux
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
