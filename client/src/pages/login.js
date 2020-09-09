import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
const styles = {
  form: {
    textAligh: "center",
  },
  textField:{
      width: "70%",
      margin: "15px 0"
  },
  button:{
      margin: "30px 0"
  },
  login:{
      display:"flex",
      flexDirection: "column",
      alignItems: "center"
  }
};


const Login = props =>  {
  const { classes } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const handleSubmit = () => {
    console.log("greetings, you are logged");
  };
  const handleChange = (event) => {

  }
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h2" className={` my-5 ${classes.pageTitle}`}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit} className={classes.login}>
          <TextField
            id="email"
            type="email"
            label="email"
            className={classes.textField}
            value={email}
            onChange={handleChange}
          />
          <TextField
            id="password"
            type="password"
            label="password"
            className={classes.textField}
            value={password}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" className={classes.button}>
              Log in
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

export default withStyles(styles)(Login);
