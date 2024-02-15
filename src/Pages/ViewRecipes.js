import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import Customimage from '../components/Customimage';
import axios from 'axios';
import { useGetUserID } from '../hooks/UseGetUserID';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

export const ViewRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [cookies, _] = useCookies(['access_token']);
  const [searchTerm, setSearchTerm] = useState(''); // Add searchTerm state

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3009/recipes');
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchFavoriteRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3009/recipes/favoriteRecipes/ids/${userID}`);
        setFavoriteRecipes(response.data.favoriteRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchFavoriteRecipes();
  }, [userID]);

  const favRecipes = async (recipeID) => {
    try {
      const response = await axios.put(
        'http://localhost:3009/recipes',
        { recipeID, userID },
        {
          headers: { Authorization: `Bearer ${cookies.access_token}` },
        }
      );
      setFavoriteRecipes(response.data.favoriteRecipes);
    } catch (err) {
      console.error('Error in favRecipes:', err);
    }
  };

  const isFavorite = (id) => favoriteRecipes.includes(id);

  // Filter recipes based on searchTerm
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Search setSearchTerm={setSearchTerm} />
      <div className='recipe-container'>
        {filteredRecipes.map((recipe, index) => (
          <div className='recipe-card' key={index}>
            <Customimage imgSrc={recipe.imageUrl} alt={recipe.name} pt='65%' />
            <div className='recipe-card-info'></div>
            <p className='recipe-title'>{recipe.name}</p>
            <p className='recipe-desc'>Discover the world through taste</p>
            <Link to={`/recipes/${recipe._id}`} className='view-btn'>
              VIEW RECIPE
            </Link>
            <button
              className='fav'
              onClick={() => favRecipes(recipe._id)}
              disabled={isFavorite(recipe._id)}
              
            >
              {isFavorite(recipe._id) ? 'Favorited' : 'Favorite'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRecipes;
