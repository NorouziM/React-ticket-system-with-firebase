import React, { useState } from "react";

import { Input } from "@windmill/react-ui";
import { Alert } from "@windmill/react-ui";

import { auth } from "../firebase.util";

import { NotificationManager } from "react-notifications";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = async (event) => {
    event.preventDefault(); // Prevent page to reload

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
    } catch (err) {
      // If Credentials are wrong
      NotificationManager.error(err.message, "Error", 5000);
    }
  };
  const onInputChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    else setPassword(event.target.value);
  };

  return (
    <div>
      <Alert className="w-1/2 center-alert" type="info">
        User 1: <strong>Email:</strong> user@user.com <strong>Password:</strong>{" "}
        user@user.com
      </Alert>
      <Alert className="mt-3 w-1/2 center-alert" type="info">
        User 2: <strong>Email:</strong> user2@user.com{" "}
        <strong>Password:</strong> user2@user.com
      </Alert>
      <Alert className="mt-3 w-1/2 center-alert" type="warning">
        Admin: <strong>Email:</strong> admin@admin.com{" "}
        <strong>Password:</strong> admin@admin.com
      </Alert>

      <div
        style={{ minHeight: "650px" }}
        className="flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="form max-w-md w-full space-y-12 -mt-72">
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-600">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-10" onSubmit={onFormSubmit}>
            <Input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>

                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={onInputChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={onInputChange}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
