import React from 'react';
import Customimage from './Customimage';

const RecipeCard = ({ recipe,favoriteRecipes }) => {
  
  return (
    <div className='recipe-card'>
      <Customimage imgSrc={recipe.imageUrl} alt={recipe.name} pt="65%" />
      <div className='recipe-card-info'></div>
      <p className='recipe-title'>{recipe.name}</p>
      <p className='recipe-desc'>Discover the world through taste</p>
      <a className='view-btn' href='#!'>
        VIEW RECIPE
      </a>
     <button onClick={()=> favoriteRecipes(recipe._id)}>Favorite</button>
    </div>
  );
};

export default RecipeCard;