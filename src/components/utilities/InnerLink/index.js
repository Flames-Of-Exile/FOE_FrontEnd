import React, { forwardRef, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";

const InnerLink = (props) => {
  const { icon, primary, to, variant } = props;

  const renderLink = useMemo(() => {
    const routerLink = (itemProps, ref) => (
      <RouterLink to={to} ref={ref} {...itemProps} />
    );
    return forwardRef(routerLink);
  }, [to]);

  if (variant === "list") {
    return (
      <li>
        <ListItem button component={renderLink}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText
            primary={<Typography color="secondary">{primary}</Typography>}
          />
        </ListItem>
      </li>
    );
  }

  return (
    <>
      <Link component={renderLink}>{primary}</Link>
    </>
  );
};

export default InnerLink;
