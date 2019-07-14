import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import "./Button.scss";

const Button = ({
  className,
  to,
  onClick,
  ...rest
}) => {
  const processedClass = cn("button", className);
  return to ? (
    <Link className={processedClass} to={to} {...rest} />
  ) : (
    <button className={processedClass} onClick={onClick} {...rest} />
  );
};

export default Button;
