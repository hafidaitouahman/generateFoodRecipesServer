const axios = require('axios');
const express = require('express');
const flatted = require('flatted');

const app = express();
const port = "3000";
const servciePort = "8082";
// create an array to store recipes
let recipes = [
  { id: 1, title: 'Recipe 1', content: 'Recipe Content 1' },
  { id: 2, title: 'Recipe 2', content: 'Recipe Content 2' },
  { id: 3, title: 'Recipe 3', content: 'Recipe Content 3' }
];
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000/recipes','http://localhost:8082/recipes' ,'http://localhost:8081/recipes']
}));
// create an endpoint to get all recipes
app.get('/recipes', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const recipesResponse = await axios.get('http://localhost:' + servciePort + '/recipes');
  data = (recipesResponse.data);
  console.log(data);
  console.log("---------------------");
  res.json(data);
});
// create an endpoint to get an recipe by id
app.get('/recipes/:id', (req, res) => {
  const recipe = recipes.find(a => a.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).send('Recipe not found');
  
  res.json(recipe);
});
// create an endpoint to create an recipe
app.post('/recipes', (req, res) => {
  const recipe = {
    id: recipes.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  recipes.push(recipe);
  res.json(recipe);
});
// create an endpoint to update an recipe
app.put('/recipes/:id', (req, res) => {
  const recipe = recipes.find(a => a.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).send('Recipe not found');
  recipe.title = req.body.title;
  recipe.content = req.body.content;
  res.json(recipe);
});
// create an endpoint to delete an recipe
app.delete('/recipes/:id', (req, res) => {
  const recipe = recipes.find(a => a.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).send('Recipe not found');
  const index = recipes.indexOf(recipe);
  recipes.splice(index, 1);
  res.json(recipe);
});
app.listen(port, () => console.log(`FoodRecipes API listening at http://localhost:${port}`));