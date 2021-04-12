import React from "react";

import { connect } from "react-redux";
import { setCurrentUser } from "../redux/userActions";

import firebase from "firebase/app";
import "firebase/storage";
import { updateProfileImage } from "../firebase.util";
import { NotificationManager } from "react-notifications";

const ProfileCard = ({
  currentUser,
  setCurrentUser,
  tickets,
  areTicketsReady,
}) => {
  console.log(areTicketsReady, "areTicketsReady");

  const onAttachChange = (e) => {
    console.log("onAttachChange");
    const img = e.target.files[0];
    if (img) {
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef.child(`images/${img.name}`).put(img);
      if (uploadTask.snapshot) {
        uploadTask.on(
          "state_changed",
          () => {},
          () => {
            NotificationManager.error("Something Went Wrong", "Error", 5000);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              NotificationManager.success(
                "Profile image Successfully Uploaded",
                "Success"
              );
              if (downloadURL)
                updateProfileImage(downloadURL, currentUser.uid).then(() => {
                  setCurrentUser({
                    email: currentUser?.email,
                    role: currentUser?.role,
                    uid: currentUser?.uid,
                    profileURL: downloadURL,
                  });
                });
            });
          }
        );
      }
    }
  };

  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="container mx-auto max-w-xs rounded-lg overflow-hidden shadow-lg my-2 bg-white">
          <div className="relative mb-6">
            <div
              className="w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${currentUser?.profileURL})`,
                minHeight: "300px",
              }}
            ></div>

            <div
              className="text-center absolute w-full"
              style={{ bottom: "-30px" }}
            >
              <button className="p-4 rounded-full transition ease-in duration-200 focus:outline-none bg-gradient">
                <input
                  className="opacity-0 absolute -z-1 w-12 -ml-5 cursor-pointer"
                  type="file"
                  name="profile-img"
                  onChange={onAttachChange}
                  accept="image/x-png,image/gif,image/jpeg"
                />
                <svg
                  viewBox="0 0 20 20"
                  enable-background="new 0 0 20 20"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    fill="#FFFFFF"
                    d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="text-center mt-10">
            <p className="text-black tracking-wide uppercase text-lg font-bold">
              {currentUser?.role}
            </p>
            <p className="text-gray-400 text-sm">{currentUser?.email}</p>
          </div>
          <div className="py-10 px-6 text-center tracking-wide grid grid-cols-1">
            <div className="posts">
              <p className="text-xlg">
                {areTicketsReady ? tickets.length : null}
              </p>
              <p className="text-gray-400 text-sm">Tickets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)), // setCurrentUser action that we used after geting user data from database
});
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser, // Pull current user from redux
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
