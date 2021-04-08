import React from "react";
import { auth } from "../firebase.util";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Badge } from "@windmill/react-ui";

const Sidebar = ({ currentUser, role, setTicketsReady }) => {
  return (
    <nav
      class="w-56 bg-white dark:bg-gray-800 select-none overflow-y-auto
		transition duration-500 ease-in-out border-gray-400 border-r shadow-lg"
    >
      <div class="flex flex-col items-center ">
        <h1
          class="text-3xl text-center font-light text-gray-600 dark:text-white-400 mt-6
				transition duration-500 ease-in-out"
        >
          React Dashboard
        </h1>

        <img
          class="h-16 w-16 rounded-full object-cover mt-4"
          src="https://hackap.ir/wp-content/uploads/2021/04/profile.png"
          alt="mickey mouse Profile"
        />
        <span
          class="mt-2 mb-6 dark:text-gray-400 transition
				duration-500 ease-in-out"
        >
          {currentUser?.email ? (
            <div className="text-center">
              <Badge type="success">{role}</Badge>
              <p>
                You are Signed in as <Badge>{currentUser?.email}</Badge>
              </p>
            </div>
          ) : (
            <p>Please login first</p>
          )}
        </span>
      </div>

      <ul>
        {currentUser?.email ? (
          <div>
            <li
              class="pl-8 py-2 font-semibold text-gray-700 dark:text-gray-400
				hover:bg-gray-200 dark-hover:bg-gray-500 mb-2 transition
				duration-500 ease-in-out"
            >
              <Link to="/tickets">
                <button
                  onClick={setTicketsReady}
                  class="focus:text-gray-500 dark-focus:text-gray-400
					focus:outline-none w-full transition duration-500 ease-in-out"
                >
                  <span class="flex items-center">
                    <svg class="h-4 w-4 fill-current" viewBox="0 0 576 512">
                      <path
                        d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5
								21.5 48 48.1 48h479.8c26.6 0 48.1-21.5
								48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1
								80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6
								6-6zm467.8 352H54.1c-3.3
								0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192
								332v40c0 6.6-5.4 12-12 12h-72c-6.6
								0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12
								5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6
								0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0
								12 5.4 12 12z"
                      ></path>
                    </svg>

                    <button class="ml-4 capitalize">Tickets</button>
                  </span>
                </button>
              </Link>
            </li>

            <li
              class="pl-8 py-2 font-semibold text-gray-500 dark:text-gray-400
				border-gray-500 hover:bg-gray-200 mb-2 transition
				duration-500 ease-in-out"
            >
              <Link to="/createTicket">
                <button
                  class="focus:text-gray-500 dark-focus:text-gray-400
					focus:outline-none w-full transition duration-500 ease-in-out"
                >
                  <span class="flex items-center">
                    <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M15 5v4h-4v4H7v4H3v3h7v-4h4v-4h4V8h4V5h-7z"></path>
                    </svg>

                    <span class="ml-4 capitalize">Create Ticket</span>
                  </span>
                </button>
              </Link>
            </li>
          </div>
        ) : null}
        <li
          class="pl-8 py-2 font-semibold text-gray-500 dark:text-gray-400
				border-gray-500 hover:bg-gray-200 mb-2 transition
				duration-500 ease-in-out"
        >
          <button
            class="focus:text-gray-500 dark-focus:text-gray-400
					focus:outline-none w-full transition duration-500 ease-in-out"
          >
            <span class="flex items-center">
              <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M15 5v4h-4v4H7v4H3v3h7v-4h4v-4h4V8h4V5h-7z"></path>
              </svg>
              {currentUser?.email ? (
                <span
                  onClick={() => {
                    auth.signOut();
                  }}
                  class="ml-4 capitalize"
                >
                  Sign out
                </span>
              ) : (
                <Link to={process.env.PUBLIC_URL + "/"}>
                  <span class="ml-4 capitalize">Login</span>
                </Link>
              )}
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(Sidebar);
