// SingleRecipe.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SingleRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  const navigate = useNavigate();
   console.log(recipeId);
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3009/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>; // You might want to show a loading state
  }

  return (
    <div>
      <h2 className='sing'>{recipe.name}</h2>
      <img src={recipe.imageUrl} alt={recipe.name} className='singleimg' />
      <p className='psing'>Ingredients:</p>
  <ul>
    {recipe.ingredients.map((ingredient, index) => (
      <li key={index}>{ingredient}</li>
    ))}
  </ul>
  <br></br>
  <p className='psing'>Instructions:</p>
  <ol>
    {recipe.instructions.split('.').filter(instruction => instruction.trim() !== '').map((instruction, index) => (
      <li key={index}>{instruction.trim()}</li>
    ))}
  </ol>
  <br></br>
  <p>
    <span className='psing'>Cooking Time:</span> {recipe.cookingTime} minutes
  </p>
    </div>
  );
};

export default SingleRecipe;
