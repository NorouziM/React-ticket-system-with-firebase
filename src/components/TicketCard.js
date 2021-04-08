import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getChatFromDB, db } from "../firebase.util";
import { Spinner } from "./Spinner";

const TicketCard = ({ ticket }) => {
  const [isTicketOpened, setTicketOpened] = useState(null);

  const toDateTime = (secs) => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return t.toLocaleDateString("en-UK", options).toString();
  };
  const checkTicketIsOpened = () => {
    getChatFromDB(ticket.id).then((dialogs) => {
      if (dialogs.length) var lastChat = dialogs.slice(-1)[0];
      if (lastChat) {
        db.collection("users")
          .doc(lastChat.owner)
          .get()
          .then((doc) => {
            if (doc.data().role === "admin") setTicketOpened(true);
            else setTicketOpened(false);
          });
      } else setTicketOpened(false);
    });
  };

  useEffect(() => {
    checkTicketIsOpened();
  }, []);

  var classString =
    "flex w-full items-center justify-between bg-white px-8 py-6 border-green-500 ";
  classString += isTicketOpened ? " " : "border-l-4";

  return (
    <div>
      {isTicketOpened !== null ? (
        <div>
          <div
            class="border dark:border-gray-700 transition duration-500
				ease-in-out"
          ></div>
          <div class="flex flex-col mt-2">
            <div class="flex flex-row mt-2">
              <div class={classString}>
                <div class="flex">
                  <img
                    class="h-12 w-12 rounded-full object-cover"
                    src="https://hackap.ir/wp-content/uploads/2021/04/profile.png"
                    alt="infamous"
                  />

                  <div class="flex flex-col ml-6">
                    <span class="text-lg font-bold">{ticket.subject}</span>
                    <div class="mt-4 flex">
                      <div class="flex">
                        <svg
                          class="h-5 w-5 fill-current
											dark:text-gray-300"
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
                          class="ml-2 text-sm text-gray-600
											dark:text-gray-300 capitalize"
                        >
                          {ticket.name}
                        </span>
                      </div>

                      <div class="flex ml-6">
                        <svg
                          class="h-5 w-5 fill-current
											dark:text-gray-300"
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
                          class="ml-2 text-sm text-gray-600
											dark:text-gray-300 capitalize"
                        >
                          {toDateTime(ticket.createdAt.seconds)}
                        </span>
                      </div>

                      <div class="flex ml-6">
                        <img
                          src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EEnvelope%3C/title%3E%3Cdesc%3EA line styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer2' fill='none' stroke='%23202020' stroke-miterlimit='10' stroke-width='2' d='M2 12l30 27.4L62 12' stroke-linejoin='round' stroke-linecap='round'%3E%3C/path%3E%3Cpath data-name='layer1' fill='none' stroke='%23202020' stroke-miterlimit='10' stroke-width='2' d='M2 12h60v40H2z' stroke-linejoin='round' stroke-linecap='round'%3E%3C/path%3E%3C/svg%3E"
                          alt="Ticket email"
                          width="20"
                        />

                        <span
                          class="ml-2 text-sm text-gray-600
											dark:text-gray-300 capitalize"
                        >
                          {ticket.email}
                        </span>
                      </div>
                    </div>

                    <div class="mt-4 flex">
                      <Link
                        to={`/profile/${ticket.id}/${ticket.subject}/${ticket.name}/${ticket.owner}/${ticket.email}/${ticket.message}`}
                      >
                        <button
                          onClick={checkTicketIsOpened}
                          class="flex items-center
										focus:outline-none border rounded-full
										py-2 px-6 leading-none border-gray-500
										dark:border-gray-600 select-none
										hover:bg-blue-400 hover:text-white
										dark-hover:text-gray-200"
                        >
                          <span>Show details</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner size={28} />
      )}
    </div>
  );
};

export default TicketCard;
