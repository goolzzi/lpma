import React from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";

const breakpoints = {
  desktop: `(min-width: 768px)`,
  phone: `(max-width: 767px)`,
};
const Breakpoint = props => {
  const breakpoint = breakpoints[props.name] || breakpoints.desktop;
  return (
    <MediaQuery {...props} query={breakpoint}>
      {props.children}
    </MediaQuery>
  );
};
Breakpoint.propTypes = {
  name: PropTypes.string,
  children: PropTypes.object,
};
export default Breakpoint;