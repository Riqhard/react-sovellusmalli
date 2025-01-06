import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';



function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Render the child route's element here */}
      </main>
      <Footer />
    </>
  );
};

export {MainLayout};