import React from "react";
import { auth } from "../firebase.util";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Badge } from "@windmill/react-ui";

const Sidebar = ({ currentUser, role, setTicketsReady }) => {
  return (
    <nav
      className="w-56 bg-white select-none overflow-y-auto
		transition duration-500 ease-in-out border-gray-400 border-r shadow-lg"
    >
      <div className="flex flex-col items-center ">
        <h1
          className="text-3xl text-center font-light text-gray-600 mt-6
				transition duration-500 ease-in-out"
        >
          React Dashboard
        </h1>

        <img
          className="h-16 w-16 rounded-full object-cover mt-4"
          src="https://hackap.ir/wp-content/uploads/2021/04/profile.png"
          alt="mickey mouse Profile"
        />
        <span
          className="mt-2 mb-6 transition
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
              className="pl-8 py-2 font-semibold text-gray-700
				hover:bg-gray-200 mb-2 transition
				duration-500 ease-in-out"
            >
              <Link to="/tickets">
                <span
                  onClick={setTicketsReady}
                  className="focus:text-gray-500 w-full transition duration-500 ease-in-out text-gray-900"
                >
                  <span className="flex items-center">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 590 530">
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

                    <button className="ml-4 capitalize">Tickets</button>
                  </span>
                </span>
              </Link>
            </li>

            <li
              className="pl-8 py-2 font-semibold text-gray-500
				border-gray-500 hover:bg-gray-200 mb-2 transition
				duration-500 ease-in-out"
            >
              <Link to="/createTicket">
                <button className="focus:text-gray-500 w-full transition duration-500 ease-in-out text-gray-900">
                  <span className="flex items-center">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 18 18">
                      <path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
                    </svg>

                    <span className="ml-4 capitalize">Create Ticket</span>
                  </span>
                </button>
              </Link>
            </li>
          </div>
        ) : null}
        <li
          className="pl-8 py-2 font-semibold text-gray-500
				border-gray-500 hover:bg-gray-200 mb-2 transition
				duration-500 ease-in-out"
        >
          <button className="focus:text-gray-500 w-full transition duration-500 ease-in-out text-gray-900">
            <span className="flex items-center">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 18 18">
                <path d="M12.546,4.6h-5.2C4.398,4.6,2,7.022,2,10c0,2.978,2.398,5.4,5.346,5.4h5.2C15.552,15.4,18,12.978,18,10C18,7.022,15.552,4.6,12.546,4.6 M12.546,14.6h-5.2C4.838,14.6,2.8,12.536,2.8,10s2.038-4.6,4.546-4.6h5.2c2.522,0,4.654,2.106,4.654,4.6S15.068,14.6,12.546,14.6 M12.562,6.2C10.488,6.2,8.8,7.904,8.8,10c0,2.096,1.688,3.8,3.763,3.8c2.115,0,3.838-1.706,3.838-3.8C16.4,7.904,14.678,6.2,12.562,6.2 M12.562,13C10.93,13,9.6,11.654,9.6,10c0-1.654,1.33-3,2.962-3C14.21,7,15.6,8.374,15.6,10S14.208,13,12.562,13"></path>
              </svg>
              {currentUser?.email ? (
                <span
                  onClick={() => {
                    auth.signOut();
                    window.location.replace(window.location.origin);
                  }}
                  className="ml-4 capitalize"
                >
                  Sign out
                </span>
              ) : (
                <Link to={process.env.PUBLIC_URL + "/"}>
                  <span className="ml-4 capitalize">Login</span>
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
