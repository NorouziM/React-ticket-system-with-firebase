import React from "react";

const ChatSidebar = ({ subject, name, email, message }) => {
  return (
    <div className="flex flex-col flex-auto w-1/4 h-full p-6 break-words">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-600 h-full p-4 text-white overflow-auto">
        <h1 className="text-2xl mt-10 font-bold">{subject}</h1>
        <div className="text-xl mt-12 font-thin">
          <h2 className="font-bold">Name</h2>
          <h2>{name}</h2>
        </div>
        <div className="text-xl mt-12 font-thin">
          <h2 className="font-bold">Email</h2>
          <h2 className="text-base">{email} </h2>
        </div>
        <div className="text-xl mt-12 font-thin">
          <h2 className="font-bold">Initial Message</h2>
          <p className="text-base">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
