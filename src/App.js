import './App.css';
import CustomNavbar from './Component/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDataForm from './Component/UserData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import TaskStatusReport from './Component/Report';
import AboutUs from './Component/AboutUs';
import Features from './Component/Features';


function App() {
  return (
    <>

      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<UserDataForm />} />
          <Route path='/generate-report' element={<TaskStatusReport />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/feature' element={<Features />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
