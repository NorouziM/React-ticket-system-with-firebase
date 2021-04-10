import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import ChatSidebar from "../components/chat/ChatSidebar";
import MyDialog from "../components/chat/MyDialog";
import HisDialog from "../components/chat/HisDialog";
import ChatInput from "../components/chat/ChatInput";
import Spinner from "../components/Spinner";

// Redux
import { connect } from "react-redux";

// Firebase
import { getChatFromDB } from "../firebase.util";

const Chat = ({ currentUser }) => {
  const [dialogs, setDialogs] = useState(null); // Store Dialogs of a single chat in local state
  const [areDialogsReady, setAreDialogsReady] = useState(false); // similar to areTicketsReady that we seen in App.js

  //Pull data of the ticker from url parameters
  const { ticketID, subject, name, owner, email, message } = useParams();

  useEffect(() => {
    getChatFromDB(ticketID).then((dialogs) => {
      setDialogs(dialogs);
      if (dialogs) setAreDialogsReady(true); // this piece of code is used to be update and with setAreDialogsReady that we send to ChatInput we get re render when new message is send
    });
  });

  return (
    <div className="flex h-screen antialiased text-gray-800 justify-center">
      {
        // if this is not your chat then you can't see it
        currentUser.uid !== owner && currentUser.role === "user" ? (
          <p>You don't have permission</p>
        ) : !areDialogsReady ? (
          // while we are waiting to get dialogs from databse we render Spinner
          <Spinner size={28} />
        ) : (
          <div className="flex flex-row h-full w-full lg:w-2/3 overflow-x-hidden">
            <ChatSidebar
              subject={subject}
              name={name}
              email={email}
              message={message}
            />
            <div className="flex flex-col flex-auto h-full p-6 w-4/5">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 border-gray-400 border shadow-lg">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                      {dialogs.map((dialog) => {
                        if (dialog.owner === currentUser.uid)
                          // check if its user's message or not
                          return (
                            <MyDialog
                              message={dialog.message}
                              img={currentUser.profileURL}
                            />
                          ); // if it's user's message then show it on right side
                        return (
                          <HisDialog
                            message={dialog.message}
                            img={currentUser.profileURL}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
                <ChatInput
                  setAreDialogsReady={setAreDialogsReady}
                  ticketID={ticketID}
                  uid={currentUser.uid}
                />
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
export default connect(mapStateToProps)(Chat);
