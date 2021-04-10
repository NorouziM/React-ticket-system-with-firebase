import React from "react";
import { connect } from "react-redux";
import { Alert } from "@windmill/react-ui";

import ProfileCard from "../components/ProfileCard";

const Profile = (props) => {
  const { currentUser, tickets, areTicketsReady } = props;

  return (
    <div>
      {currentUser?.email ? (
        <ProfileCard tickets={tickets} areTicketsReady={areTicketsReady} />
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
