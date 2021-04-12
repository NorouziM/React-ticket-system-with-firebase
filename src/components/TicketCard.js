import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Firebase
import { getChatFromDB, db, deleteTicket } from "../firebase.util";

import Spinner from "./Spinner";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";

// Redux
import { connect } from "react-redux";

const TicketCard = ({ ticket, currentUser }) => {
  const [isTicketOpened, setTicketOpened] = useState(null); // State to store whether ticket has opened or not
  // if admin has sent the last message it has opened

  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  const toDateTime = (secs) => {
    // Convert Timestamp stored in database to readable date
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return t.toLocaleDateString("en-UK", options).toString();
  };

  // Check if the last message is an admin message
  const checkTicketIsOpened = () => {
    getChatFromDB(ticket.id).then((dialogs) => {
      // Get all the chats related to this ticket

      // if there is any dialogs on it, get the last one
      if (dialogs) var lastChat = dialogs.slice(-1)[0];
      //  check who owns the last message?
      if (lastChat) {
        db.collection("users")
          .doc(lastChat.owner)
          .get()
          .then((doc) => {
            if (doc.data().role === "admin") setTicketOpened(true);
            // if it's an admin message so flag it as opned ticket
            else setTicketOpened(false);
          });
      } else setTicketOpened(false); // if there was no message on this ticket
    });
  };

  useEffect(() => {
    checkTicketIsOpened();
    // eslint-disable-next-line
  }, []);

  var classString =
    "flex w-5/6 mx-auto	-my-0 items-center justify-between bg-white px-8 py-6 border-indigo-500 shadow-lg ";
  classString += isTicketOpened ? " " : "border-l-4";

  return (
    <div>
      {isTicketOpened !== null ? (
        <div>
          <div className="flex flex-col mt-4">
            <div className="flex flex-row mt-2">
              <div className={classString}>
                <div className="flex">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src="https://hackap.ir/wp-content/uploads/2021/04/profile.png"
                    alt="infamous"
                  />

                  <div className="flex flex-col ml-6">
                    <span className="text-lg font-bold">{ticket.subject}</span>
                    <div className="mt-4 flex">
                      <div className="flex">
                        <svg
                          className="h-5 w-5 fill-current
											"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 4a4 4 0 014 4 4 4 0 01-4 4
												4 4 0 01-4-4 4 4 0 014-4m0
												10c4.42 0 8 1.79 8
												4v2H4v-2c0-2.21 3.58-4 8-4z"
                          ></path>
                        </svg>
                        <span
                          className="ml-2 text-sm text-gray-600
											 capitalize"
                        >
                          {ticket.name}
                        </span>
                      </div>

                      <div className="flex ml-6">
                        <svg
                          className="h-5 w-5 fill-current
											"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19
												19H5V8h14m-3-7v2H8V1H6v2H5c-1.11
												0-2 .89-2 2v14a2 2 0 002 2h14a2 2
												0 002-2V5a2 2 0 00-2-2h-1V1m-1
												11h-5v5h5v-5z"
                          ></path>
                        </svg>
                        <span
                          className="ml-2 text-sm text-gray-600
											 capitalize"
                        >
                          {toDateTime(ticket.createdAt.seconds)}
                        </span>
                      </div>

                      <div className="flex ml-6">
                        <img
                          src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EEnvelope%3C/title%3E%3Cdesc%3EA line styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer2' fill='none' stroke='%23202020' stroke-miterlimit='10' stroke-width='2' d='M2 12l30 27.4L62 12' stroke-linejoin='round' stroke-linecap='round'%3E%3C/path%3E%3Cpath data-name='layer1' fill='none' stroke='%23202020' stroke-miterlimit='10' stroke-width='2' d='M2 12h60v40H2z' stroke-linejoin='round' stroke-linecap='round'%3E%3C/path%3E%3C/svg%3E"
                          alt="Ticket email"
                          width="20"
                        />

                        <span
                          className="ml-2 text-sm text-gray-600
										 capitalize"
                        >
                          {ticket.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mt-4 flex">
                        <Link
                          // Send ticket data to chat box via url params
                          to={`/profile/${ticket.id}/${ticket.subject}/${ticket.name}/${ticket.owner}/${ticket.email}/${ticket.message}`}
                        >
                          <button
                            onClick={checkTicketIsOpened}
                            className="flex items-center
										rounded-full
										py-2 px-6 leading-none
										 select-none text-white bg-gradient"
                          >
                            <span>Show details</span>
                          </button>
                        </Link>
                      </div>
                      {currentUser.role === "admin" ? (
                        // if it's admin let him delete the ticket
                        <div className="ml-4 mt-4 flex">
                          <button
                            onClick={openModal}
                            className="flex items-center
										rounded-full
										py-2 px-6 leading-none
										 select-none text-white bg-red-500"
                          >
                            <span>Delete</span>
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalHeader>Deleting ticket</ModalHeader>
            <ModalBody>Are you sure you want to delete this ticket?</ModalBody>
            <ModalFooter>
              <Button
                className="w-full sm:w-auto"
                layout="outline"
                onClick={closeModal}
              >
                No
              </Button>
              <Button
                onClick={() => deleteTicket(ticket.id)}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600"
              >
                Yes
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      ) : (
        <Spinner size={28} />
      )}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser, // pull current user from redux
});
export default connect(mapStateToProps)(TicketCard);
