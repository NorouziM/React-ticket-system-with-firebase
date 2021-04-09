import React from "react";
import { connect } from "react-redux";
import { Alert } from "@windmill/react-ui";

const Profile = (props) => {
  const { currentUser } = props;

  return (
    <div>
      {currentUser?.email ? (
        <Alert className="mt-5 w-1/2 center-alert" type="success">
          You are logged in
        </Alert>
      ) : (
        <Alert className="mt-5 w-1/2 center-alert" type="warning">
          You are not logged in
        </Alert>
      )}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
export default connect(mapStateToProps)(Profile);
