
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import HomeDashboard from './components/dashboard/HomeDashboard';
import Expanses from './components/dashboard/expanses/Expanses';
import { SidebarProvider } from './components/dashboard/SidebarContext';
import AddSubExp from './components/dashboard/subExpanses/AddSubExp';
import ManageSubExpenses from './components/dashboard/subExpanses/ManageSubExpenses';

function App() {
  return (
    <div className="App">
      <SidebarProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<HomeDashboard/>}/>
        <Route path="/expanse" element={<Expanses/>}/>
        <Route path="/addSubExpanse/:id" element={<AddSubExp/>}/>
        <Route path="/manageSubExpenses" element={<ManageSubExpenses/>}/>
      </Routes>
      </BrowserRouter>
      </SidebarProvider>
    </div>
  );
}

export default App;
