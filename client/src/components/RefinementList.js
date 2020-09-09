import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
const styles = {
    ul:{
        listStyle: "none"
    }
};
const RefinementList = ({ items, classes }) => {
  return (
    <ul className={classes.ul}>
      {items.map((item) => (
        <li key={item.label}>
          <a href="/" style={{ fontWeight: item.isRefined ? "bold" : "" }}>
            {item.label} ({item.count})
          </a>
        </li>
      ))}
    </ul>
  );
};
export default withStyles(styles)(RefinementList);
