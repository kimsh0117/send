import React from "react";
import "./Responsive.scss";
import cn from "classnames";

const Responsive = ({ children, className, ...rest }) => (
  <div className={cn("common", "responsive", className)} {...rest}>
    {children}
  </div>
);

export default Responsive;
