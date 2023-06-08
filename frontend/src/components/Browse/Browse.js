import React, { useState, useEffect } from "react";
import Allproducts from "./Allproducts.js";

import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

// import { Card, Container, Grid } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import ListItemButton from "@mui/material/ListItemButton";
import SendIcon from "@mui/icons-material/Send";


function Browse(user) {
  const [triviaData, setTriviaData] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState([]);

  const handleSubmit = async () => {
    console.log("i am submitting");
    console.log("i am submitting");
    fetch(`https://dummyjson.com/products/category/${text}`)
      .then((response) => response.json())
      .then((data) => setTriviaData(data.products))
      .catch((error) => console.log("Error: ", error));
    // fetch data from firestore for that category
    const firestoreResponse = await fetch(`https://week3-team4-ecommerce-backend.onrender.com/firestore/get-products-by-category/${text}`);
    const firestoreData = await firestoreResponse.json();
  console.log('firestore data for category', text, "is",  firestoreData);
    // Update the state with the combined data
    setTriviaData(prevState => [...prevState, ...firestoreData]);

  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const dummyResponse = await fetch("https://dummyjson.com/products");
        const dummyData = await dummyResponse.json();
        setTriviaData(dummyData.products);
  
        const firestoreResponse = await fetch("https://week3-team4-ecommerce-backend.onrender.com/firestore/get-all-products");
        const firestoreData = await firestoreResponse.json();
        console.log('firestore data', firestoreData);
        // Update the state with the combined data
        setTriviaData(prevState => [...prevState, ...firestoreData]);
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
      style={{
        overflow: "auto",
        height: "100vh",
        marginBottom: "500px",
      }}
    >
      <div className="page">
        <header
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "4rem",
          }}
        >
          <ListItem
            disableGutters
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <TextField
              hiddenLabel
              id="standard-textarea"
              label="Find what you need:"
              placeholder="Type here.."
              multiline
              variant="standard"
              value={text}
              sx={{
                width: { sm: 400, md: 405 },
                marginLeft: 4,
              }}
              onChange={(e) => setText(e.target.value)}
            />
            <ListItemButton autoFocus onClick={() => handleSubmit()}>
              <SendIcon />
            </ListItemButton>
          </ListItem>
        </header>

        <Container maxWidth="lg">
          <Grid container spacing={4} justify="left">
            {triviaData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card style={{ height: "100%" }}>
                  <Allproducts
                    title={item.title ? item.title : item.name}
                    description={item.description}
                    price={item.price}
                    brand={item.brand}
                    rating={item.rating}
                    user={user}
                    img={item.thumbnail ? item.thumbnail : item.image_url}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

    </div>
  );
}
export default Browse;
