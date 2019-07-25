import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import "./Button.scss";

const Button = ({ className, to, ...rest }) => {
  const processedClass = cn(className);
  return to ? (
    <Link className={processedClass} to={to} {...rest} />
  ) : (
    <button className={processedClass} {...rest} />
  );
};

export default Button;
