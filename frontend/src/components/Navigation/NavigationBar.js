import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link as RouterLink, useLocation } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { createTheme } from "@mui/material/styles";
import StorefrontIcon from "@mui/icons-material/Storefront";
// firebase
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
// axios
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: { main: "#FEFAE0", contrastText: "#0A191F" },
    background: {
      default: "#BB623E",
    },
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: "white",
      },
    },
  },
});

const StyledStorefrontIcon = styled(StorefrontIcon)(({ theme }) => ({
  color: "#FEFAE0",
  "&:hover": {
    color: "#bb623e",
  },
  "&.active": {
    color: "#bb623e",
  },
}));

const StyledHomeIcon = styled(HomeIcon)(({ theme }) => ({
  color: "#FEFAE0",
  "&:hover": {
    color: "#bb623e",
  },
  "&.active": {
    color: "#bb623e",
  },
}));

const StyledAccountBoxIcon = styled(AccountBoxIcon)(({ theme }) => ({
  color: "#FEFAE0",
  "&:hover": {
    color: "#bb623e",
  },
  "&.active": {
    color: "#bb623e",
  },
}));
const StyledShoppingCartIcon = styled(ShoppingCartIcon)(({ theme }) => ({
  color: "#FEFAE0",
  "&:hover": {
    color: "#bb623e",
  },
  "&.active": {
    color: "#bb623e",
  },
}));

const NavigationBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      else{
        setUser(null)
      }
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#606C38", boxShadow: "none" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ color: "black", flexGrow: 1, textAlign: "left" }}
          >
            {/* <p><small>placeholder</small></p> */}
          </Typography>
          {isMobile ? (
            <IconButton
              color="black"
              aria-label="menu"
              edge="end"
              onClick={toggleDrawer}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          ) : (
            <div>
              {/* Home Button */}
              <Button
                component={RouterLink}
                to="/"
                color="inherit"
                sx={{ marginRight: "12px" }}
              >
                <StyledHomeIcon
                  fontSize="large"
                  className={location.pathname === "/" ? "active" : ""}
                />
              </Button>
              {/* Sell Items */}
              {user && 
              (<Button
                component={RouterLink}
                to="/newproduct"
                color="inherit"
                sx={{ marginRight: "12px" }}
                >
                <StyledStorefrontIcon
                  className={
                    location.pathname === "/newproduct" ? "active" : ""
                  }
                  fontSize="large"
                />
              </Button>)}
              
              {/* Cart */}
              <Button
                component={RouterLink}
                to="/cart"
                color="inherit"
                sx={{ marginRight: "12px" }}
              >
                <StyledShoppingCartIcon
                  className={location.pathname === "/cart" ? "active" : ""}
                  fontSize="large"
                />
              </Button>
              {/* Profile */}
              <Button color="inherit" component={RouterLink} to="/profile">
                <StyledAccountBoxIcon
                  className={location.pathname === "/profile" ? "active" : ""}
                  fontSize="large"
                />
              </Button>
            </div>
          )}
        </Toolbar>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "#606C38",
            },
          }}
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer}
        >
          <List sx={{ width: 150 }} onClick={toggleDrawer}>
            {/* Home */}
            <ListItem component={RouterLink} to="/">
              <StyledHomeIcon
                fontSize="large"
                className={location.pathname === "/" ? "active" : ""}
              />
            </ListItem>
            {/* Sell */}
            {user && 
            (<ListItem  component={RouterLink} to="/newproduct">
              <StyledStorefrontIcon
                className={location.pathname === "/newproduct" ? "active" : ""}
                fontSize="large"
              />
            </ListItem>)}
            
            {/* Cart */}
            <ListItem  component={RouterLink} to="/cart">
              <StyledShoppingCartIcon
                className={location.pathname === "/cart" ? "active" : ""}
                fontSize="large"
              />
            </ListItem>
            {/* Profile */}
            <ListItem component={RouterLink} to="/profile">
              <StyledAccountBoxIcon
                className={location.pathname === "/profile" ? "active" : ""}
                fontSize="large"
              />
            </ListItem>
            <ListItem
              style={{ paddingLeft: 6 }}
              component={RouterLink}
              to="/"
            ></ListItem>
          </List>
        </Drawer>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavigationBar;
