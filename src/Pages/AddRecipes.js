import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/UseGetUserID';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


export default function AddRecipes() {
  const userID=useGetUserID();
  const [cookies,_] = useCookies(["access_token"]);

  const[recipe,setRecipe]=useState(
    {
      name:"",
      ingredients:[],
      instructions:"",
      imageUrl:"",
      cookingTime:0,
      userOwner:userID,
    }
  );
const navigate=useNavigate();


  const handleChange=(event)=>{
     const { name,value}=event.target;
    setRecipe({...recipe,[name]:value});
  }
  const handleIngredientChange=(event,idx)=>{
    const {value}=event.target;
    const ingredients=recipe.ingredients;
    ingredients[idx]=value;
    setRecipe({...recipe,ingredients});
    console.log(recipe);
  }
  const addIngredient=()=>{
    setRecipe({...recipe,ingredients:[...recipe.ingredients,""]});
  }
 const onSubmit= async(event)=>{
  event.preventDefault();
  try {
    await axios.post("http://localhost:3009/recipes", recipe, {
      headers: { Authorization: `Bearer ${cookies.access_token}` },
    });
    alert("Recipe Created");
    navigate("/");
  }
  catch(err){
    console.log(err);
  }
 };
  return (
    
    <div className='addRecipe'>

    <h2 className='h2'>Add Recipes</h2><br/>
    <form onSubmit={onSubmit}>
    <label htmlFor='name'>Name</label><br/>
    <input type='text' id='name' name='name' onChange={handleChange}/><br/>
    <label htmlFor='ingredients'>Ingredients</label><br/>
    {recipe.ingredients.map((ingredient,idx)=>(
      <input key={idx} type='text' name ='ingredients' value={ingredient} onChange={(event)=>{
        handleIngredientChange(event,idx)
      }}/>
    ))}<br/>
     <button onClick={addIngredient} type='button'>Add Ingredient</button><br/>

    <label htmlFor='instructions'>Instructions</label><br/>
    <textarea id='instructions' name='instructions' onChange={handleChange}/><br/>
    <label htmlFor='imageUrl'>Image URL</label><br/>
    <input type='text' id='imageUrl' name='imageUrl' onChange={handleChange}/><br/>
    <label htmlFor='cookingTime'>Cooking Time (minutes)</label><br/>
    <input type='number' id='cookingTime' name='cookingTime' onChange={handleChange}/><br/>
    <button className='btn-submit' type='submit'>Create Recipe</button><br/>

    </form></div>
  )
}




