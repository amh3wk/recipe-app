import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import GroceryList from "./pages/GroceryList";
import AddRecipe from "./pages/AddRecipe";
import Profile from "./pages/Profile";
import Plan from "./pages/Plan";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout><GroceryList /></Layout>} />
          <Route path="/grocery-list" element={<Layout><GroceryList /></Layout>} />
          <Route path="/recipes" element={<Layout><Recipes /></Layout>} />
          <Route path="/plan" element={<Layout><Plan /></Layout>} />
          <Route path="/add-recipe" element={<Layout><AddRecipe /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
