import Login from "@/components/Login";
import Signup from "@/components/Signup";
import React from "react";

const index = () => {
  return (
    <div>
      <Login />
      {<div className="body">{/* <Signup /> */}</div>}
    </div>
  );
};

export default index;
