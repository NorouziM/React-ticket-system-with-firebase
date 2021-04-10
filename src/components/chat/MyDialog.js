import React from "react";

const MyDialog = ({ message, img }) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="flex bg-cover bg-center items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 text-white"
        ></div>
        <div className=" relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default MyDialog;
