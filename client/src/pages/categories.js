import React from "react";
import {Link} from "react-router-dom"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import ProductsIntroImg from "../assets/products_category.jpg";
import Box from "@material-ui/core/Box";
import { sizing } from "@material-ui/system";
import "../styles/home.scss";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import algoliasearch from "algoliasearch/lite";
import RefinementList from "../components/RefinementList"
import LaptopAvatar from "../assets/laptop_avatar.jpg"
import ComputerAvatar from "../assets/computer_avatar.jpg"
import phoneAvatar from "../assets/phone_avatar.jpg"
import Avatar from "@material-ui/core/Avatar"
import Footer from "../components/Footer"
import cameraAvatar from "../assets/camera_avatar.jpg"
import monitorAvatar from "../assets/monitor_avatar.jpg"
import ipadAvatar from "../assets/ipad_avatar.jpg"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import LaptopSectionImg from "../assets/laptop_section.jpg"

const styles = {
    intro_image: {
        width: "100%",
        height: "auto",
    },
    noBlock: {
        display:"inline-block"
    }
};

function Categories( props ) {
    const {match, classes} = props
    return (
        <div>
            <Box width="75%" className={`mx-auto my-5`}>
                <img src={LaptopSectionImg} className={classes.intro_image} alt="laptop" />
                <Grid container direction="column" className="mt-5">
                    <Divider variant="fullWidth" />
                    <Breadcrumbs className="my-3">
                        <Link color="inherit" to="/products">Electronics</Link>
                        <Link color="inherit" className="text-capitalize" to={`/category/${match.params.category_id}`}>{match.params.category_id}s</Link>
                    </Breadcrumbs>
                    <Divider variant="fullWidth" />
                </Grid>
                <h2>{match.params.category_id}</h2>
                <Grid container>
                    <Grid container item xs={4}>

                    </Grid>
                    <Grid container item xs={8}>

                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default withStyles(styles)(Categories);
