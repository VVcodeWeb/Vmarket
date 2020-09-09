import React from 'react'
import {Link} from "react-router-dom"
import "../styles/NavBar.scss"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from '@material-ui/core/Toolbar'
import Typography from "@material-ui/core/Typography"
import Search from "./Input_shadow_anim"
import withStyles from "@material-ui/core/styles/withStyles"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faUser, faCartPlus, faDollarSign, faSearch } from "@fortawesome/free-solid-svg-icons"


const styles = {
    toolBar: {
        dislay: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    appBar: {
        display:"flex",
        alightItems: "center",
        justifyContent: "center",
        minHeight: "110px"
    }
}


function NavBar(props) {
    const { classes } = props
    return (
        <AppBar position="relative" className={classes.appBar}>
            <Toolbar className={classes.toolBar}> 
                <Typography variant="h4"> 
                    <Link to="/">Vmarket </Link>
                </Typography>
                
                <Search margin={false} icon={faSearch}/>
                <div className="icons_container">
                    <div className="wrapper">
                        <FontAwesomeIcon icon={faUser} />
                        <Typography variant="caption" className="ml-1"> Account </Typography>
                    </div>
                    <div className="wrapper mx-4">
                        <FontAwesomeIcon icon={faCartPlus} />
                        <Typography variant="caption" className="ml-1"> Shopping </Typography>
                    </div>
                    <div className="wrapper">
                        <FontAwesomeIcon  icon={faDollarSign} />
                        <Typography variant="caption" className="ml-1"> Selling </Typography>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    )
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(NavBar)
