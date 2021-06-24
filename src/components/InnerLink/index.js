import React, { forwardRef, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";

const InnerLink = (props) => {
  const { text, to } = props;

  const renderLink = useMemo(() => {
    const routerLink = (itemProps, ref) => (
      <RouterLink to={to} ref={ref} {...itemProps} />
    );
    return forwardRef(routerLink);
  }, [to]);

  return (
    <>
      <Link component={renderLink}>{text}</Link>
    </>
  );
};

export default InnerLink;
