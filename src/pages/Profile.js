import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const Profile = (props) => {
  const { currentUser } = props;

  return (
    <div>
      {currentUser?.email ? (
        <p>You are logged in</p>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
export default connect(mapStateToProps)(Profile);
