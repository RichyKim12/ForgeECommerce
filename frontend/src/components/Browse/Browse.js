import React, { useState, useEffect } from "react";
import Allproducts from "./Allproducts.js";
import { Card, Container, Grid } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import ListItemButton from "@mui/material/ListItemButton";
import SendIcon from "@mui/icons-material/Send";

function Browse(user) {
  const [triviaData, setTriviaData] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState([]);

  const handleSubmit = async () => {
    console.log('i am submitting');
    fetch(`https://dummyjson.com/products/category/${text}`)
      .then((response) => response.json())
      .then((data) => setTriviaData(data.products))
      .catch((error) => console.log("Error: ", error));
  };

useEffect(() => {
    console.log(triviaData);
  }, [triviaData]);

  // on mount, load all the products
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setTriviaData(data.products))
      .catch((error) => console.log("Error: ", error));
  }, [])

  return (
    <div
      style={{
        overflow: "auto",
        height: "100vh",
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
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              console.log(text);
            }}
          ></input>
          <div>
            <button class="fa fa-search" type="submit" onClick={handleSubmit} style={{margin:'5rem'}}>
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
                    img={item.thumbnail}
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
