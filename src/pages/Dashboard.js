import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { connect } from "react-redux";
import { getTicketsFromDB, getTicketsFromDBUser } from "../firebase.util";
import TicketCard from "../components/TicketCard";
import CreateTicket from "../components/CreateTicket";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const Dashboard = (props) => {
  const { currentUser } = props;
  const [ticketListTrigger, setTicketListTrigger] = useState(false);
  const [createTicketTrigger, setCreateTicketTrigger] = useState(false);
  const [tickets, setTickets] = useState([]);

  const ticketViewTrigger = () => {
    setTicketListTrigger(true);
    setCreateTicketTrigger(false);
  };
  const CreateTicketFormTrigger = () => {
    setTicketListTrigger(false);
    setCreateTicketTrigger(true);
  };
  useEffect(() => {
    if (currentUser?.role) {
      currentUser?.role === "user"
        ? setTickets(getTicketsFromDBUser(currentUser))
        : setTickets(getTicketsFromDB());
    }
  }, []);

  return (
    <div class="h-screen flex">
      <Sidebar
        role={currentUser?.role}
        ticketViewTrigger={ticketViewTrigger}
        CreateTicketFormTrigger={CreateTicketFormTrigger}
      />
      <main
        class="flex-1 bg-gray-200 dark:bg-gray-900 overflow-y-auto transition
		duration-500 ease-in-out"
      >
        {ticketListTrigger ? (
          tickets.map((ticket) => {
            return <TicketCard ticket={ticket} />;
          })
        ) : createTicketTrigger ? (
          <CreateTicket />
        ) : currentUser?.email ? (
          <p>You are logged in</p>
        ) : (
          <p>You are not logged in</p>
        )}
      </main>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
export default connect(mapStateToProps)(Dashboard);
