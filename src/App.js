
import { Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { Provider } from 'react-redux';
import { postStore } from './redux/store';
import Homapage from './pages/Homapage';
import PostDetail from './pages/PostDetail';

function App() {

  return (
    <div  className="">

<Provider store={postStore}>
<Routes>
<Route path='/' element={<Homapage/>}></Route>
<Route path='/login' element={<Login/>} ></Route>

<Route path='/signup' element={<Signup/>} ></Route>
<Route path='/postDetail' element={<PostDetail/>} ></Route>


</Routes>
</Provider>
    </div>
  );
}

export default App;
