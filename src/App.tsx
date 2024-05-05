import Home from "./pages/home/Home";
import Courses from "./pages/courses/Courses";
import DemoCourse from "./pages/democourse/DemoCourse";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import "./styles/global.scss";
import FlashCards from "./pages/flashcards/flashcards"

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";


const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: < RegisterPage/>,
        },
        {
          path: "/courses",
          element: <Courses/>,
        },
        {
          path: "/courses/:id", // New route for individual courses
          element: <DemoCourse />
        },
        {
        path: "/democourse",
        element: <DemoCourse/>,
      },
      
      
      {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: "/register",
        element: <RegisterPage/>,
      }, 
      {
        path: "/flashcards",
        element: <FlashCards/>,
      }, 
    ],
    },

  ]);

  return <RouterProvider router={router} />;
}

export default App;
