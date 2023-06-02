
import { Routes,Route } from 'react-router-dom';
import Login from './pages/Login';



import HomepageTransporter from './pages/HomepageTransporter';
import HomepageManufacturer from './pages/HomepageManufacturer';
import Signup from './pages/Signup';
import { createContext } from 'react';
import useValues from './hook/values';

export const MyContext=createContext()
function App() {
const values=useValues()

  return (
    <div  className="">
<MyContext.Provider value={values}>
<Routes>
<Route path='/homeTransporter' element={<HomepageTransporter/>}></Route>
<Route  path='/' element={<Login/>} ></Route>
<Route  path='/signup' element={<Signup/>} ></Route>

<Route path='/homemanufacturer' element={<HomepageManufacturer/>} ></Route>


</Routes>
</MyContext.Provider>
    </div>
  );
}

export default App;
