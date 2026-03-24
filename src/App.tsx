import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Workouts from "./pages/Workouts";
import Supplements from "./pages/Supplements";
import Nutrition from "./pages/Nutrition";
import Blog from "./pages/Blog";
import Calculator from "./pages/Calculator";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminWorkouts from "./pages/admin/AdminWorkouts";
import AdminSupplements from "./pages/admin/AdminSupplements";
import AdminMealPlans from "./pages/admin/AdminMealPlans";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminContacts from "./pages/admin/AdminContacts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/supplements" element={<Supplements />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/workouts" element={<AdminWorkouts />} />
            <Route path="/admin/supplements" element={<AdminSupplements />} />
            <Route path="/admin/meal-plans" element={<AdminMealPlans />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
