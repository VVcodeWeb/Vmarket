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
import {
    InstantSearch,
    SearchBox,
    Hits,
    ClearRefinements,
    Configure,
    Pagination,
    connectRefinementList,
    Breadcrumb
} from "react-instantsearch-dom";
const searchClient = algoliasearch(
    "B1G2GM9NG0",
    "aadef574be1f9252bb48d4ea09b5cfe5"
);

const styles = {
    intro_image: {
        width: "100%",
        height: "auto",
    },
    noBlock: {
        display:"inline-block"
    }
};

function Products(props) {
    const { classes } = props;
    return (
        <div className="mt-4">
            <Box width="75%" className={`mx-auto my-5`}>
                <Box width="100%">
                    <img
                        src={ProductsIntroImg}
                        className={classes.intro_image}
                        alt="intro image"
                    />
                </Box>
                <Grid container direction="column" className="mt-5">
                    <Divider variant="fullWidth" />
                    <Breadcrumbs className="my-3">
                        <Link color="inherit" href="/products">Electronics</Link>
                    </Breadcrumbs>
                    <Divider variant="fullWidth" />
                </Grid>
                <Grid container>
                    <Grid item xs={4} className="text-left">
                        <List>
                            <Typography className="mb-3" variant="h5">Shop by category</Typography>
                            <ListItem disableGutters>Laptops (10)</ListItem>
                            <ListItem disableGutters>Computers (20)</ListItem>
                            <ListItem disabled disableGutters>Cameras (0)</ListItem>
                            <ListItem disabled disableGutters>Monitors (0)</ListItem>
                            <ListItem disabled disableGutters>iPads (0)</ListItem>
                            <ListItem disableGutters>Phones (50)</ListItem>
                            <ListItem disableGutters>Hardware (50)</ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container className="p-3">
                            <Grid item xs className="m-3">
                                <img src={LaptopAvatar} alt="laptop avatar" />
                                <Typography className="mt-1" variant="subtitle2">Laptops</Typography>
                            </Grid>
                            <Grid item xs className="m-3">
                                <img src={ComputerAvatar} alt="computer avatar" />
                                <Typography className="mt-1" variant="subtitle2">Computers</Typography>
                            </Grid>
                            <Grid item xs className="m-3"> 
                                <img src={phoneAvatar} alt="phone avatar" />
                                <Typography className="mt-1" variant="subtitle2">Phones</Typography>
                            </Grid>

                            <Grid item xs className="m-3">
                                <img src={cameraAvatar} alt="camera avatar" />
                                <Typography className="mt-1" variant="subtitle2">Cameras</Typography>
                            </Grid>
                            <Grid item xs className="m-3">
                                <img src={monitorAvatar} alt="phone avatar" />
                                <Typography className="mt-1" variant="subtitle2">Monitors</Typography>
                            </Grid>
                            <Grid item xs className="m-3">
                                <img src={ipadAvatar} alt="iPad avatar" />
                                <Typography className="mt-1" variant="subtitle2">iPads</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </div>
    );
}

export default withStyles(styles)(Products);
