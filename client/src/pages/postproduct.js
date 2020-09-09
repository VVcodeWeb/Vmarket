import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import fs from "fs"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px"
  },
  formControl: {
    width: "150px"
  },
  label: {
    display: "block",
    width: "150px",
    maxWidth: "300px",
    margin: "30px 0",
    backgroundColor: "#041E42",
    borderRadius: "2px",
    color:"white",
    fontSize: "1em",
    lineHeight: "2.5em",
    textAlign: "center",
    "&:hover":{
      backgroundColor: "#0065FF"
    },
    "&:active":{
      backgroundColor:"#FFC220"
    }
  },
  input:{
    border: "0",
    clip: "rect(1px, 1px, 1px, 1px)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px"
  }

}));
const productDetailsSkeleton = {
  title: "",
  category: "computer",
  price: "",
  description: "",
  photo: ""
}

function Postproduct( props ) {
  const classes = useStyles();
  const [productDetails, setProductDetails] = useState(productDetailsSkeleton);

  const handleChange = (event) => {
    setProductDetails({
      ...productDetails,
      [event.target.name]: event.target.name === "photo"? event.target.files: event.target.value
    })
  };

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append("title", productDetails.title)
    formData.append("description", productDetails.description)
    formData.append("category", productDetails.category)
    formData.append("price", productDetails.price)
    formData.append("photo", productDetails.photo[0])
    try {
      const response = await axios({
        url: "http://localhost:5000/user/image",
        method: "POST",
        data: formData,
        headers: {'Content-Type': 'multipart/form-data' }
      })
      setProductDetais(productDetailsSkeleton)
      console.log(response)
    } catch (e) {
      console.log(e.response)
    }
  }
  const userHandle = props.match.params.userhandle
  return (
    <Box width="75%" className="mx-auto">
        <Typography variant="h3">What are you going to sell today, {userHandle}</Typography>
      <Grid container className="mt-4">
        <Grid xs item></Grid>
        <Grid xs item container direction="column" alignItems="flex-start">
            <TextField
              id="standard-full-width"
              label="Title"
              placeholder="Product"
              fullWidth
              name="title"
              margin="normal"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl className={`${classes.formControl} my-3`}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                className="text-left"
                name="category"
                defaultValue="computer"
                value={productDetails.category}
                onChange={handleChange}
              >
                <option value="phone">Phone</option>
                <option value="laptop">Laptop</option>
                <option value="computer">Computer</option>
                <option value="hardware">Hardware</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>
            <Input
              className="my-3"
              name="price"
              onChange={handleChange}
              endAdornment={<InputAdornment position="end">$</InputAdornment>}
              aria-describedby="standard-weight-helper-text"
              placeholder="Price"
              inputProps={{
                "aria-label": "weight",
              }}
            />
            <label htmlFor="apply" className={classes.label}><input type="file" onChange={handleChange} name="photo" id="apply" className={classes.input} accept="image/*" />Get file</label>
            <TextField
              label="Description"
              name="description"
              fullWidth
              onChange={handleChange}
              className={classes.textField}
              helperText="Description of the product"
              multiline
              rows={4}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>Post</Button>
        </Grid>
        <Grid xs item></Grid>
      </Grid>
    </Box>
  );
}

export default Postproduct;
