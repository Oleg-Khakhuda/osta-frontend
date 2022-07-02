import React from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Button } from "../button/button";

const Navbar = () => {
    return (
        <Button
        style={{width: "100px"}}>
            <Link to='/create-plate'>
                Додати виріб
            </Link>
        </Button>
    )
};

export default Navbar;