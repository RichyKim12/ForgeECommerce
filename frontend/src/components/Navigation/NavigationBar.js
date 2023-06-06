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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from "@mui/icons-material/Home";
import { createTheme} from "@mui/material/styles";
import StorefrontIcon from '@mui/icons-material/Storefront';

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
              <Button
                component={RouterLink}
                to="/newproduct"
                color="inherit"
                sx={{ marginRight: "12px" }}
              >
                <StyledStorefrontIcon
                  className={location.pathname === "/newproduct" ? "active" : ""}
                  fontSize="large"
                />
              </Button>
              <Button
                component={RouterLink}
                to="/checkout"
                color="inherit"
                sx={{ marginRight: "12px" }}
              >
                <StyledShoppingCartIcon
                  className={location.pathname === "/checkout" ? "active" : ""}
                  fontSize="large"
                />
              </Button>
              <Button component={RouterLink} to="/profile" color="inherit">
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
              backgroundColor: "#e4eef6",
            },
          }}
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer}
        >
          <List sx={{ width: 150 }} onClick={toggleDrawer}>
            <ListItem  component={RouterLink} to="/">
              <StyledHomeIcon
                fontSize="large"
                className={location.pathname === "/" ? "active" : ""}
              />
            </ListItem>
            <ListItem  component={RouterLink} to="/checkout">
              <StyledShoppingCartIcon
                className={location.pathname === "/checkout" ? "active" : ""}
                fontSize="large"
              />
            </ListItem>
            <ListItem  component={RouterLink} to="/profile">
              <StyledAccountBoxIcon
                className={location.pathname === "/profile" ? "active" : ""}
                fontSize="large"
              />
            </ListItem>
            <ListItem
              style={{ paddingLeft: 6 }}
              component={RouterLink}
              to="/"
            >
             
            </ListItem>
          </List>
        </Drawer>
        
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavigationBar;