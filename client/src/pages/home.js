import React from "react";
import Box from "@material-ui/core/Box";
import { sizing } from "@material-ui/system";
import "../styles/home.scss";
import introLaptopImg1 from "../assets/iphone.jpg";
import introLaptopImg2 from "../assets/laptop_main_2.jpg";
import introPhoneImg from "../assets/phone_main.jpg";
import withStyles from "@material-ui/core/styles/withStyles";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/CarouselItem";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import RepImg from "../assets/1-reputation_sm.jpg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PayPalLogo from "../assets/PayPal-Logo.png";
import DeliveryImage from "../assets/Delivery.jpg";
import Paper from "@material-ui/core/Paper";
import LaptopCategory from "../assets/category_laptop.jpg";
import PhoneCategory from "../assets/category_phone.jpg";
import ComputerCategory from "../assets/category_computer.jpg";
import OldPhoneCategory from "../assets/category_oldPhone.jpg";
import RadioCategory from "../assets/category_radio.jpg";
import DetailsCategory  from "../assets/details.jpg"
import Footer from "../components/Footer"
//import OldPhoneCategory from "../assets/category_oldPhone.jpg";


const styles = {
  image_wrapper: {
    height: "600px",
    overflow: "hidden",
    position: "relative",
  },
  advantagesGrid: {
    background: "#F5F5F5",
  },
  category_images:{
      /* objectFit: "cover",
      objectPosition: "50% 50%", */
      width: "100%",
      height: "auto"
  },
};

function home(props) {
  const { classes } = props;
  return (
    <div className="home mt-5" width="100">
      <Box width="75%" className={`m-auto `}>
        <Box width="100" className={classes.image_wrapper}>
          <Carousel>
            <CarouselItem>
              <img
                src={introLaptopImg1}
                className="d-block w-100"
                alt="first slide"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src={introLaptopImg2}
                className="d-block w-100"
                alt="second slide"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src={introPhoneImg}
                className="d-block w-100"
                alt="third slide"
              />
            </CarouselItem>
          </Carousel>
        </Box>
        {/* ADVANTAGES GRID */}
        <Grid container className={`mt-5 ${classes.advantagesGrid}`}>
          <Grid item xs={4}>
            <Card className={`m-3 ${classes.root}`}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="200"
                  image={RepImg}
                  title="Contemplative Reptile"
                  className="rep_img"
                />
                <Box width="75%" height="75%" className="m-auto">
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Choose a vendor you can trust
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={`m-3 ${classes.root}`}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="200"
                  image={DeliveryImage}
                  title="Contemplative Reptile"
                />
                <Box width="75%" height="75%" className="m-auto">
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Receive your order in a few days
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={`m-3 ${classes.root}`}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="200"
                  image={PayPalLogo}
                  title="Contemplative Reptile"
                />
                <Box width="75%" height="75%" className="m-auto">
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Fast and secure pay with PayPal
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Box width="100%" className={`mt-3`}>
          <Typography variant="h4" className={`my-5`} >Shop by category</Typography>
          <Grid container justify="space-between">
            <Grid item container xs={3} justify="space-between" className="py-2">
              <Paper square={true}>
                <img src={LaptopCategory} alt="laptop category" className={`${classes.category_images}`}/>
                <Typography variant="subtitle1" >Laptops</Typography>
              </Paper>
            </Grid>
            <Grid item xs={3} className="py-2">
              <Paper square={true}>
                <img src={PhoneCategory} alt="phone category" className={`${classes.category_images} ${classes.iphone_image}`}/>
                <Typography variant="subtitle1">Smart Phones</Typography>
              </Paper>
            </Grid>
            <Grid item xs={3} className="py-2" >
              <Paper square={true} justify="space-between">
                <img src={ComputerCategory} alt="computer category" className={`${classes.category_images}`}/>
                <Typography variant="subtitle1">Computers</Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid container justify="space-between" className={`my-5`}>
            <Grid item xs={3}>
              <Paper square={true}>
                <img src={OldPhoneCategory} alt="old phone category" className={`${classes.category_images}`}/>
                <Typography variant="subtitle1" className="mt-2">Phones</Typography>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper square={true}>
                <img src={RadioCategory} alt="radio category" className={`${classes.category_images}`}/>
                <Typography variant="subtitle1" className="mt-2 text-">Radios</Typography>       
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper square={true}>
                <img src={DetailsCategory} alt="details category" className={`${classes.category_images}`}/>
                <Typography variant="subtitle1" className="mt-2">Hardware</Typography>       
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </div>
  );
}

export default withStyles(styles)(home);
