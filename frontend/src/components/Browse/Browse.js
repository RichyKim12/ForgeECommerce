import React, { useState, useEffect } from "react";
import Allproducts from "./Allproducts.js";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

function Browse() {
  const [triviaData, setTriviaData] = useState([]);
  const [text, setText] = useState([]);
  const [category, setCategory] = useState([]);

  const handleSubmit = () => {
    fetch(`https://dummyjson.com/products/category/${text}`)
      .then((response) => response.json())
      .then((data) => setTriviaData(data.products))
      .catch((error) => console.log("Error: ", error));
  };

  useEffect(() => {
    console.log(triviaData);
  }, [triviaData]);

  return (
    <div className="page">
      <header>
        <label for="string">Find anything you need: </label>
        <input
          id="string"
          placeholder="Search for anything..."
          type="string"
          onChange={(event) => setText(event.target.value)}
        ></input>
        <div>
          <button class="fa fa-search" type="submit" onClick={handleSubmit}>
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
                  image = {item.thumbnail}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
export default Browse;

