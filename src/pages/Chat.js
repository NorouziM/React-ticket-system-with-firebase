import React, { useEffect, useState } from "react";
import ChatSidebar from "../components/chat/ChatSidebar";
import MyDialog from "../components/chat/MyDialog";
import HisDialog from "../components/chat/HisDialog";
import ChatInput from "../components/chat/ChatInput";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getChatFromDB } from "../firebase.util";
import { Spinner } from "../components/Spinner";

const Chat = ({ currentUser }) => {
  const [dialogs, setDialogs] = useState(null);
  const [areDialogsReady, setAreDialogsReady] = useState(false);

  //props.match.params
  const { ticketID, subject, name, owner, email, message } = useParams();
  useEffect(() => {
    getChatFromDB(ticketID).then((dialogs) => {
      setDialogs(dialogs);
      if (dialogs) setAreDialogsReady(true);
    });
  });

  return (
    <div class="flex h-screen antialiased text-gray-800 justify-center">
      {currentUser.uid !== owner && currentUser.role === "user" ? (
        <p>You don't have permission</p>
      ) : !areDialogsReady ? (
        <Spinner size={28} />
      ) : (
        <div class="flex flex-row h-full w-full lg:w-2/3 overflow-x-hidden">
          <ChatSidebar
            subject={subject}
            name={name}
            email={email}
            message={message}
          />
          <div class="flex flex-col flex-auto h-full p-6 w-4/5">
            <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 border-gray-400 border shadow-lg">
              <div class="flex flex-col h-full overflow-x-auto mb-4">
                <div class="flex flex-col h-full">
                  <div class="grid grid-cols-12 gap-y-2">
                    {dialogs.map((dialog) => {
                      if (dialog.owner === currentUser.uid)
                        return <MyDialog message={dialog.message} />;
                      return <HisDialog message={dialog.message} />;
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
      )}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
export default connect(mapStateToProps)(Chat);
