import React, { useState } from "react";
import { addTicketToDB } from "../firebase.util";
import { connect } from "react-redux";

const CreateTicket = ({ currentUser, setTicketsReady }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const nameOnChange = (e) => {
    setName(e.target.value);
  };
  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };
  const subjectOnChange = (e) => {
    setSubject(e.target.value);
  };
  const messageOnChange = (e) => {
    setMessage(e.target.value);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    const ticket = {
      name: name,
      subject: subject,
      email: email,
      message: message,
    };
    addTicketToDB(ticket, currentUser);
    console.log("setTicketsReady(false);");
    setTicketsReady(false);
  };

  return (
    <div className=" flex items-center justify-center">
      <form
        id="form"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/5 mt-12"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            id="name"
            type="text"
            onChange={nameOnChange}
            placeholder="Your Name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            id="email"
            type="email"
            onChange={emailOnChange}
            placeholder="Your Email"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Subject
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="subject"
            id="subject"
            onChange={subjectOnChange}
            type="text"
            placeholder="Subject of Your Ticket"
            required
          ></input>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Your message
          </label>

          <textarea
            className="bshadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="message"
            id="message"
            type="text"
            onChange={messageOnChange}
            placeholder="Tell us What's wrong"
            required
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            id="submit"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={onFormSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
export default connect(mapStateToProps)(CreateTicket);
