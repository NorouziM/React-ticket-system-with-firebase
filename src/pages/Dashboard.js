import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { connect } from "react-redux";
import { getTicketsFromDB } from "../firebase.util";
import TicketCard from "../components/TicketCard";
import CreateTicket from "../components/CreateTicket";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const Dashboard = (props) => {
  const { role } = props.currentUser;
  const [ticketListTrigger, setTicketListTrigger] = useState(false);
  const [createTicketTrigger, setCreateTicketTrigger] = useState(false);
  const [tickets, setTickets] = useState(false);

  const ticketViewTrigger = () => {
    setTicketListTrigger(true);
    setCreateTicketTrigger(false);
  };
  const CreateTicketFormTrigger = () => {
    setTicketListTrigger(false);
    setCreateTicketTrigger(true);
  };
  useEffect(() => {
    setTickets(getTicketsFromDB());
  }, []);

  return (
    <div class="h-screen flex">
      <Sidebar
        role={role}
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
        ) : (
          <Route path={"/dashboard"}>
            <p>You are logged in</p>
          </Route>
        )}
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(Dashboard);
