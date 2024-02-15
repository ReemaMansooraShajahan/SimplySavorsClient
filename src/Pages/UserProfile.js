import { Link } from 'react-router-dom';
import Customimage from '../components/Customimage';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userPostedRecipes, setUserPostedRecipes] = useState([]);
  const [cookies] = useCookies(['access_token' , 'user_id']);
  const [userProfileError, setUserProfileError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async (token , userID) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(`http://localhost:3009/auth/user/profile/${userID}`, config);
        console.log('User Profile Response:', response.data);
        setUserProfile(response.data);
      } catch (error) {
        console.error('User Profile Error:', error);
        setUserProfileError(error.message || 'An error occurred while fetching user profile');
      }
    };

    const fetchUserPostedRecipes = async (userID) => {
      try {
        console.log('Fetching user posted recipes for user ID:', userID);
        const response = await axios.get(`http://localhost:3009/recipes/postedRecipes/${userID}`);
        console.log('User posted recipes response:', response);
        setUserPostedRecipes(response.data.userRecipes);
      } catch (error) {
        console.error('Recipes fetching error:', error);
      }
    };
    const fetchData = async () => {
      try {
        const userID = cookies['user_id'];
        console.log('Fetching user profile for user ID:', userID);

        // Check if both access_token and user_id cookies are present
        if (cookies['access_token'] && userID) {
          fetchUserProfile(cookies['access_token'], userID);
          console.log('Fetching user posted recipes for user ID:', userID);
          fetchUserPostedRecipes(userID);
        } else {
          console.error('Either access_token or user_id cookie is missing.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [cookies]);

  const deleteRecipe = async (recipeID) => {
    try {
      if (!userProfile) {
        console.error('User profile is not available.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${cookies['access_token']}`,
        },
      };

      // Make a DELETE request to delete the recipe
      const response = await axios.delete(`http://localhost:3009/recipes/${recipeID}`, config);

      if (response.status === 204) {
        // Recipe deleted successfully, update UI
        alert('Recipe deleted successfully');
        // Refetch user posted recipes after deletion
        const responsePostedRecipes = await axios.get(`http://localhost:3009/recipes/postedRecipes/${userProfile._id}`);
        setUserPostedRecipes(responsePostedRecipes.data.userRecipes);
      } else {
        alert('Failed to delete recipe');
        // Handle error cases, such as displaying an error message to the user
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      // Handle network errors or other exceptions
    }
  };

  return (
    <div>
      {userProfile && (
        <div>
          <h1 className='fav-head'>User Profile</h1>
          <br></br>
          <div className='puse'>
            <p className='pu'><span>Name:</span>{userProfile.name}</p>
            <p className='pu'><span>Username:</span> {userProfile.username}</p>
            <p className='pu'><span>Email:</span>{userProfile.email}</p>
          </div>
        </div>
      )}

      {/* {userProfileError && (
        <div>
          <p>Error fetching user profile: {userProfileError}</p>
        </div>
      )} */}

      <div>
        <br></br>
        <h1 className='fav-head'>User Posted Recipes</h1>
<br></br>
        {userPostedRecipes.length > 0 && (
          <div>
            <div className='recipe-container'>
              {userPostedRecipes.map((recipe) => (
                <div className='r-card' key={recipe._id}>
                  <Customimage imgSrc={recipe.imageUrl} alt={recipe.name} pt="65%" />
                  <p className='r-title'>{recipe.name}</p>
                  <p className='r-desc'>Discover the world through taste</p>
                  <Link to={`/recipes/${recipe._id}`} className='view-btn'>
                    VIEW RECIPE
                  </Link>
                  <button
                    className='fav'
                    onClick={() => deleteRecipe(recipe._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
