import React from 'react';
import Header from './containers/header';
import Home from './containers/home';
import Register from './containers/user/register'
import Login from './containers/user/login'
import Logout from './containers/user/logout'
import Profil from './containers/profil'
import Product from './containers/product'
import Detail from './containers/detail'
import Admin from './containers/admin/admin'
import AddBeer from './containers/admin/beer/addBeer'
import EditBeer from './containers/admin/beer/editBeer'
import Basket from './containers/basket';
import Payment from './containers/payment';
import Success from './containers/success';
import TestHook from './containers/testHook';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import RequireDataAuth from './helpers/require-data-auth';


function App() {
  return (
    <div className="App">
      <Header />
      
  	     <Routes>
  	        <Route exact path="/" element= {<RequireDataAuth child={Home} />}/>
  	        <Route exact path="/register" element= {<RequireDataAuth child={Register}/>}/>
  	        <Route exact path="/login" element= {<RequireDataAuth child={Login}/>}/>
  	        <Route exact path="/logout" element= {<RequireDataAuth child={Logout}/>}/>
  	        <Route exact path="/product" element= {<RequireDataAuth child={Product}/>}/>
  	        <Route exact path="/product/detail/:id" element= {<RequireDataAuth child={Detail}/>}/>
  	        <Route exact path="/profil" element= {<RequireDataAuth child={Profil} auth={true}/>}/>
  	        <Route exact path="/admin" element= {<RequireDataAuth child={Admin} auth={true} isAdmin={true}/>}/>
  	        <Route exact path="/admin/beer/add" element= {<RequireDataAuth child={AddBeer} auth={true} isAdmin={true}/>}/>
  	        <Route exact path="/admin/beer/edit/:id" element= {<RequireDataAuth child={EditBeer} auth={true} isAdmin={true}/>}/>
  	        <Route exact path="/basket" element= {<RequireDataAuth child={Basket}/>}/>
  	        <Route exact path="/payment/:orderId" element= {<RequireDataAuth child={Payment} auth={true}/>}/>
  	        <Route exact path="/success" element= {<RequireDataAuth child={Success}/>}/>
  	        {/*<Route exact path="/fake" element= {<RequireDataAuth child={Fake} auth={true}/>}/>*/}
  	        <Route exact path="/testHook" element={<TestHook something="foo"/>}/>
  	     </Routes>
  	  
    </div>
  );
}

export default App;
