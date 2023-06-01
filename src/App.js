
import { Routes,Route } from 'react-router-dom';
import Login from './pages/Login';



import HomepageTransporter from './pages/HomepageTransporter';
import HomepageManufacturer from './pages/HomepageManufacturer';
import Signup from './pages/Signup';

function App() {

  return (
    <div  className="">

<Routes>
<Route path='/homeTransporter' element={<HomepageTransporter/>}></Route>
<Route  path='/' element={<Login/>} ></Route>
<Route  path='/signup' element={<Signup/>} ></Route>

<Route path='/homemanufacturer' element={<HomepageManufacturer/>} ></Route>


</Routes>
    </div>
  );
}

export default App;
