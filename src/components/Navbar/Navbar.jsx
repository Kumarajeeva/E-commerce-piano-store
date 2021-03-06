import React from "react";
import {AppBar, Toolbar, IconButton, Badge, Typography} from "@material-ui/core";
import {ShoppingCart, Home} from "@material-ui/icons";
import {Link, useLocation} from "react-router-dom"

import logo from "../../assets/keyboard1.png";
import useStyles from "./styles";

const Navbar = ({totalItems, handleEmptyCart}) => {

    const classes=useStyles();

    let location = useLocation();
    
    return (
        <>
            <AppBar position="fixed" className={classes.appbar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="E-commerce" height="25px" className={classes.image} />
                        Piano Mart
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname==="/" && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div> ) }
                    {location.pathname==="/cart" && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/" aria-label="Home button" color="inherit">
                            <Home/>
                        </IconButton>
                    </div>   
                    )}
                    {location.pathname==="/confirm" && (
                        <div className={classes.button}>
                            <IconButton component={Link} to="/" aria-label="Home button" color="inherit" onClick={handleEmptyCart}>
                                <Home/>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar