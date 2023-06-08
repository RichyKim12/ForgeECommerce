import React, { useState, useEffect } from "react";
import Allproducts from "./Allproducts.js";

import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

// import { Card, Container, Grid } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import ListItemButton from "@mui/material/ListItemButton";
import SendIcon from "@mui/icons-material/Send";

function Browse(user) {
  const [triviaData, setTriviaData] = useState([]);
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [newProductCategory, setNewProductCategory] = useState("");

  const productCategoriesArray = {
    smartphones: "Smartphones",
    laptops: "Laptops",
    fragrances: "Fragrances",
    skincare: "Skincare",
    groceries: "Groceries",
    home_decoration: "Home Decoration",
    furniture: "Furniture",
    tops: "Tops",
    womens_dresses: "Women's Dresses",
    womens_shoes: "Women's Shoes",
    mens_shirts: "Men's Shirts",
    mens_shoes: "Men's Shoes",
    mens_watches: "Men's Watches",
    womens_watches: "Women's Watches",
    womens_bags: "Women's Bags",
    womens_jewellery: "Women's Jewelry", // american english #cringe
    sunglasses: "Sunglasses",
    automotive: "Automotive",
    motorcycle: "Motorcycle",
    lighting: "Lighting",
  };

  const replaceDashesWithSpaces = (string) => {
    // capitalize the first letter of each word as well
    const temp = string.split("-").join(" ");
    return temp.charAt(0).toUpperCase() + temp.slice(1);
  };

  const handleSubmit = async () => {
    // handle the case when the newProductCategory is "all"
    if (newProductCategory === "all") {
      try {
        const dummyResponse = await fetch("https://dummyjson.com/products");
        const dummyData = await dummyResponse.json();
        setTriviaData(dummyData.products);

        const firestoreResponse = await fetch(
          "https://week3-team4-ecommerce-backend.onrender.com/firestore/get-all-products"
        );
        const firestoreData = await firestoreResponse.json();
        // Update the state with the combined data
        setTriviaData((prevState) => [...prevState, ...firestoreData]);

        return;
      } catch (error) {
        console.log("Error:", error);
      }
    }

    fetch(`https://dummyjson.com/products/category/${newProductCategory}`)
      .then((response) => response.json())
      .then((data) => setTriviaData(data.products))
      .catch((error) => console.log("Error: ", error));
    // fetch data from firestore for that category
    const firestoreResponse = await fetch(
      `https://week3-team4-ecommerce-backend.onrender.com/firestore/get-products-by-category/${newProductCategory}`
    );
    const firestoreData = await firestoreResponse.json();
    // Update the state with the combined data
    setTriviaData((prevState) => [...prevState, ...firestoreData]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dummyResponse = await fetch("https://dummyjson.com/products");
        const dummyData = await dummyResponse.json();
        setTriviaData(dummyData.products);

        const firestoreResponse = await fetch(
          "https://week3-team4-ecommerce-backend.onrender.com/firestore/get-all-products"
        );
        const firestoreData = await firestoreResponse.json();
        // Update the state with the combined data
        setTriviaData((prevState) => [...prevState, ...firestoreData]);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    //     <div className="page">
    //       <header>
    //         <label for="string">Find anything you need: </label>
    //         <input
    //           id="string"
    //           placeholder="Search for anything..."
    //           type="string"
    //           valueholder=""
    //           onChange={(event) => setText(event.target.value)}
    //         ></input>
    //         <div>
    //           <button class="fa fa-search" type="submit" onClick={() => { handleSubmit(); handleSubmit2(); }}>
    //             GO!
    //           </button>
    //         </div>
    //       </header>
    //       <div style={{ height: "88vh", overflow: "auto" }}>
    //         <Container maxWidth="lg"  >
    //           <Grid container spacing={4} justify="left" style={{ overflow: "auto" }}>
    //             {triviaData.map((item, index) => (
    //               <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
    //                 <Card style={{ height: "100%" }}>
    //                   <Allproducts
    //                     title={item.title || item.name}
    //                     description={item.description}
    //                     price={item.price}
    //                   />
    //                 </Card>
    //               </Grid>
    //             ))}
    //           </Grid>
    //         </Container>
    //       </div>

    <div
      style={
        {
          // height: "100vh",
          // marginBottom: "500px",
        }
      }
    >
      <div
      // // className="page"
      // style={{
      // display: "flex",
      // alignItems: "center",
      // marginBottom: "4rem",
      // }}
      >
        {/* <div
          // className="page"
          // style={{
          //   display: "flex",
          //   alignItems: "center",
            // marginBottom: "4rem",
          // }}
        > */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            padding: "auto",
            // marginBottom: "4rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
              padding: "auto",
              marginBottom: "1rem",
            }}
          >
            <ListItem
              // disableGutters
              sx={{
                // p: "2px 4px",
                display: "flex",
                alignItems: "center",
                // width: "100%",
                // width: 400,
              }}
            >
              <FormControl fullWidth sx={{ width: "20rem" }}>
                <Select
                  value={newProductCategory}
                  onChange={(e) => {
                    setNewProductCategory(e.target.value);
                  }}
                  displayEmpty
                  inputProps={{
                    name: "category",
                    id: "category",
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  {Object.keys(productCategoriesArray).map(
                    (category, index) => {
                      return (
                        <MenuItem
                          value={category.toString().replace("_", "-")}
                          key={index}
                        >
                          {productCategoriesArray[category]}
                        </MenuItem>
                      );
                    }
                  )}
                  <MenuItem value={"all"}>All products</MenuItem>
                </Select>
              </FormControl>
              <ListItemButton autoFocus onClick={() => handleSubmit()}>
                <SendIcon />
              </ListItemButton>
            </ListItem>
          </div>
          {/* </div> */}
        </div>

        <Container maxWidth="lg">
          <Grid container spacing={4} justify="left">
            {triviaData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Allproducts
                  title={item.title ? item.title : item.name}
                  description={item.description}
                  price={item.price}
                  brand={item.brand}
                  rating={item.rating}
                  user={user}
                  img={item.thumbnail ? item.thumbnail : item.image_url}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
}
export default Browse;
