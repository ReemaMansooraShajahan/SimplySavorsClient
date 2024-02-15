import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Customimage from "../components/Customimage";
import { Link } from "react-router-dom";
const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [cookies] = useCookies(["user_id"]);
  const removeFromFavorites = async (recipeId) => {
    try {
      if (!cookies.user_id) {
        console.error('User ID is not available.');
        return;
      }
  
      // Send a request to remove from favorites
      await axios.delete(`http://localhost:3009/favorites/removeFromFavorites/${cookies.user_id}/${recipeId}`);
  
      // Update the local state to reflect the change
      setFavoriteRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );
    } catch (err) {
      console.error("Error removing from favorites:", err);
      // Optionally, set an error state to display a user-friendly message
    }
  };
  

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        if (cookies.user_id) {
          const response = await axios.get(
            `http://localhost:3009/recipes/favoriteRecipes/${cookies.user_id}`
          );
          setFavoriteRecipes(response.data.favoriteRecipes);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchFavoriteRecipes();
  }, [cookies]);
  return (
    <div>
      <h2 className='fav-head'>Your Favorite Recipes</h2>
      <div className='recipe-container'>
      {favoriteRecipes.map((recipe, index) => (
         <div className='recipe-card'>
         <Customimage imgSrc={recipe.imageUrl} alt={recipe.name} pt="65%" />
         <div className='recipe-card-info'></div>
         <p className='recipe-title'>{recipe.name}</p>
        
         <p className='recipe-desc'>Discover the world through taste</p>
         <Link to={`/recipes/${recipe._id}`} className='view-btn'>
              VIEW RECIPE
            </Link>
         <button  className='fav' onClick={() => removeFromFavorites(recipe._id)}>
    Remove
  </button>
       </div>
      ))}
    </div>
  </div>

  );
};

export default Favorites;