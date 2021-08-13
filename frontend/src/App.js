import React from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
//import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import LandingScreen from './screens/LandingScreen';
import { useSelector } from 'react-redux';
import './App.css';

function App() {

const userSignin = useSelector(state => state.userSignin);
const { userInfo } = userSignin;  

const openMenu = () => {
  document.querySelector(".sidebar").classList.add("open");
}

const closeMenu = () => {
  document.querySelector(".sidebar").classList.remove("open");
}



function deleteAllCookies() {
 var c = document.cookie.split("; ");
 var i;
 for (i in c) 
  document.cookie =/^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";    
};

const handleLogout = () => {
  deleteAllCookies();
  window.localStorage.clear();
  window.location.reload(true);
  window.location.replace('/');
};


  return (

    <BrowserRouter>   
      <div className="grid-container">
        <header className="header">          
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
            </button>
            <Link to="/">Home</Link>
          </div>
          <div className="header-links">
            
              {
                userInfo ?
              <button className="button" onClick={() => handleLogout()}>
                <i></i>
              </button>: <a href="#"></a>
              }
              
              <Link to="/cart">Cart</Link>
              {
                userInfo ? <Link to="/">{userInfo.name}</Link> :
                <Link to="/signin"></Link>  
              }

          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul className="categories">
            <li>
              <Link to="/category/dryfruit">Dry Fruits</Link>
            </li>
            <li>
              <Link to="/category/sweets">Sweets</Link>
            </li>
            <li>
              <Link to="/category/milksweets">Milk Sweets</Link>
            </li>
            <li>
              <Link to="/category/desisweets">Desi Sweets</Link>
            </li>
            <li>
              <Link to="/category/chikki">Chikki</Link>
            </li>
            <li>
              <Link to="/category/special">Special</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
           
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/home" exact={true} component={LandingScreen} />
          </div>
        </main>
      <footer className="footer">
        All rights reserved.
      </footer>
    </div>
  </BrowserRouter>   
  );
}

export default App;
