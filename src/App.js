// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import ViewRecipes from './Pages/ViewRecipes';
import UserProfile from './Pages/UserProfile';
import AddRecipes from './Pages/AddRecipes';
import Settings from './Pages/Settings';
import Logout from './Pages/Logout';
import Signup from './Pages/Signup';
import Registeration from './Pages/Registeration';
import Favorites from './Pages/Favorites';
import Profile from './Pages/Profile';
import SingleRecipe from './Pages/SingleRecipe';

function App() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const handleToggleFavorite = (recipe) => {
    setFavoriteRecipes((prevFavorites) => {
      const currentFavorites = Array.isArray(prevFavorites) ? prevFavorites : [];
      const isRecipeInFavorites = currentFavorites.some((favRecipe) => favRecipe.title === recipe.title);

      if (isRecipeInFavorites) {
        return currentFavorites.filter((favRecipe) => favRecipe.title !== recipe.title);
      } else {
        return [...currentFavorites, recipe];
      }
    });
  };

  return (
    <Router>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/login" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/viewrecipes"
            element={<ViewRecipes onToggleFavorite={handleToggleFavorite} favoriteRecipes={favoriteRecipes} />}
          />
          <Route path="/recipes/:recipeId" element={<SingleRecipe />} />
          <Route path="/addrecipes" element={<AddRecipes />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/registeration" element={<Registeration />} />
         
          <Route path="/favorites" element={<Favorites favoriteRecipes={favoriteRecipes} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
