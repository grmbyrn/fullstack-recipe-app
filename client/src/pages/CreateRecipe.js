import {useState} from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import {useNavigate} from 'react-router-dom'

const CreateRecipe = () => {
  const userID = useGetUserID()

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    imageUrl: '',
    cookingTime: 0,
    userOwner: userID
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target
    setRecipe({...recipe, [name]: value})
  }

  const handleIngredientChange = (e, idx) => {
    const {value} = e.target
    const ingredients = [...recipe.ingredients]
    ingredients[idx] = value
    setRecipe({...recipe, ingredients})
  }

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""]
    setRecipe({...recipe, ingredients})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      await axios.post('http://localhost:3002/recipes', {...recipe})
      alert('Recipe Created')
      navigate('/')
    }catch (err){
      console.error(err)
    }
  }

  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text" 
          id='name' 
          name='name'
          value={recipe.name}
          onChange={handleChange}
        />

        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type='text'
            name='ingredients'
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, idx)}
          />
        ))}
        <button
          onClick={handleAddIngredient}
          type='button'
        >
          Add Ingredient
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          name="instructions" 
          id="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text" 
          id='imageUrl' 
          name='imageUrl' 
          value={recipe.imageUrl}
          onChange={handleChange} 
        />

        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id='cookingTime'
          name='cookingTime'
          value={recipe.cookingTime}
          onChange={handleChange} 
        />
        <button type='submit'>Create Recipe</button>
      </form>
    </div>
  )
}
export default CreateRecipe