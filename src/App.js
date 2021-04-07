import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import React, { Suspense, useEffect } from "react";

import "./App.css";
import { Spinner } from "./components/Spinner";
import Nav from "./components/Nav";

import { db } from "./firebase.util";

import { Homepage } from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";

import { auth } from "./firebase.util";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/userActions";
// Dynamic Imorting with React Lazy

function App(props) {
  const { setCurrentUser, currentUser, history } = props;

  useEffect(() => {
    var unSubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user.email, "Sign in Successfull");
        var docRef = db.collection("users").doc(`${user.uid}`);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              setCurrentUser({
                email: doc.data().email,
                role: doc.data().role,
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
        setCurrentUser({ email: null, role: null });
      }
    });

    return function cleanup() {
      unSubscribeFromAuth();
    };
  }, []);
  return (
    <div>
      <Router>
        <Suspense fallback={<Spinner size={28} />}>
          <Route exact path={"/"}>
            {/* (currentUser ? <Redirect to="/dashboard" /> : ( */}
            <div>
              <Nav />
              <Homepage />
            </div>
          </Route>

          <Route exact path={"/dashboard"}>
            <Dashboard />
          </Route>
        </Suspense>
      </Router>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
