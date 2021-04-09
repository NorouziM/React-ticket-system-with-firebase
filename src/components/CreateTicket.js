import React, { useState } from "react";
import { addTicketToDB } from "../firebase.util";
import { connect } from "react-redux";
import { HelperText } from "@windmill/react-ui";
import { NotificationManager } from "react-notifications";

const CreateTicket = ({ currentUser }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  var errors = [];

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
    if (errors.length) {
      errors.map((err) => NotificationManager.error(err, "Error", 5000));
    } else addTicketToDB(ticket, currentUser);
  };
  const setError = (text) => {
    errors.push(text);
    return <HelperText valid={false}>{text}</HelperText>;
  };
  const clearError = (text, errText) => {
    if (errors.length) {
      errors.forEach((err) => {
        if (err === errText) errors.pop(); // Removed the error if you have fixed it
      });
    }
    return <HelperText valid>{text}</HelperText>;
  };

  const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  return (
    <div className=" flex items-center justify-center">
      <form
        id="form"
        className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-3/5 mt-12"
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
            type="text"
            onChange={nameOnChange}
            placeholder="Your Name"
            required
          />
          {name.length > 5 && name.length !== 0
            ? clearError("Name is valid", "Your name is too short")
            : setError("Your name is too short")}
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
            type="email"
            onChange={emailOnChange}
            placeholder="Your Email"
            required
          />
          {validEmailRegex.test(email) && name.length !== 0
            ? clearError("Email is valid", "Provide a valid email")
            : setError("Provide a valid email")}
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
            onChange={subjectOnChange}
            type="text"
            placeholder="Subject of Your Ticket"
            required
          ></input>
          {subject.length > 5 && subject.length !== 0
            ? clearError("Subject is valid", "Your subject is too short")
            : setError("Your subject is too short")}
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
            type="text"
            onChange={messageOnChange}
            placeholder="Tell us What's wrong"
            required
          ></textarea>
          {message.length > 10 && message.length !== 0
            ? clearError("Message is valid", "Your Message is too short")
            : setError("Your Message is too short")}
        </div>

        <div className="flex items-center justify-between">
          <button
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
