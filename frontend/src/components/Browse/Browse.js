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

  const handleSubmit = async () => {
    fetch(`https://dummyjson.com/products/${text}`)
      .then((response) => response.json())
      .then((data) => setTriviaData(data.products))
      .catch((error) => console.log("Error: ", error));
  };


  const handleSubmit2 = () => {
    axios.get('http://localhost:9000/firestore/get-all-products')
      .then((response) => {
        const productsList = response.data;
        setTriviaData((prevData) => [...prevData, ...productsList]);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };
  console.log("data")
  console.log(triviaData)
  useEffect(() => {
    console.log(triviaData);
  }, [triviaData]);

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
        height: "inherit",
        marginBottom: "500px",
      }}
    >
      <div className="page">
        <header>
          {/* <ListItem disableGutters>
            <TextField
              hiddenLabel
              id="standard-textarea"
              label="Join the Conversation"
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
          </ListItem> */}
          <label for="string">Find anything you need: </label>
          <input
            id="string"
            placeholder="Search for anything..."
            type="string"
            valueholder=""
            onChange={(event) => setText(event.target.value)}
          ></input>
          <div>
            <button class="fa fa-search" type="submit" onClick={() => { handleSubmit(); handleSubmit2(); }}>
              GO!
            </button>
          </div>
        </header>

        <Container maxWidth="lg">
          <Grid container spacing={4} justify="left">
            {triviaData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card style={{ height: "100%" }}>
                  <Allproducts
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    brand={item.brand}
                    rating={item.rating}
                    user={user}
                    img={item.img}
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


