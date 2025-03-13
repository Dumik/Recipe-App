import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import RecipeList from './pages/RecipeList';
import RecipeDetails from './pages/RecipeDetails';
import SelectedRecipes from './pages/SelectedRecipes';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/selected" element={<SelectedRecipes />} />
      </Routes>
    </MainLayout>
  );
}

export default App;