import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import {routes} from "../../routes";

const Navbar = () => {
    return (
        <Button>
            <Link to={routes.createPlates}>
                Додати виріб
            </Link>
        </Button>
    )
};

export default Navbar;