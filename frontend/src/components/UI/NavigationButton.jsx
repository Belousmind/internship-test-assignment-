import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const NavigationButton = ({ to, label, state, ...props }) => {
  return (
    <Link to={to} state={state}>
      <Button {...props}>{label}</Button>
    </Link>
  );
};

export default NavigationButton;