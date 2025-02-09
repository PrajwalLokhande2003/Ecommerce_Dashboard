import React, { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import PrivateComponent from './components/PrivateComponent';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import OrderList from './components/OrderList';
import OrderTracking from './components/OrderTrack';
import OrderTransection from './components/OrderTransection';
import Inventory from './components/Inventory';
import ReceivedOrders from './components/ReceivedOrders';
import PurchasesList from './components/PurchasesList';
import PurchaseOrder from './components/PurchaseOrder';
import PurchaseReturn from './components/PurchaseReturn';
import CategoryList from './components/CategoryList';
import CreateCategory from './components/CreateCategory';
import Profile from './components/Profile';

import Creator from './components/Creator';

function App() {

      const[theme,setTheme] = useState(sessionStorage.length>0?JSON.parse(sessionStorage.getItem('themes')).theme:'dark')
      const[Toper,setToper] = useState(sessionStorage.length>0?JSON.parse(sessionStorage.getItem('toper')).color:'dark')
      const[Menu,setMenu] = useState(sessionStorage.length>0?JSON.parse(sessionStorage.getItem('menu')).color:'dark')
      const[Menusize,setMenuSize] = useState(sessionStorage.length>0?JSON.parse(sessionStorage.getItem('menu-size')).size:'sm-hover-active')

      document.documentElement.setAttribute("data-bs-theme", theme)
      document.documentElement.setAttribute("data-header-theme", Toper)
      document.documentElement.setAttribute("data-nav-theme", Menu)
      document.documentElement.setAttribute("data-menu-size", Menusize)


  return (
    <>
    <BrowserRouter>
    <Nav/>
    <Routes>
    <Route element={<PrivateComponent/>}>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/product' element={<ProductList/>}/>
    <Route path='/add-product' element={<AddProduct/>}/>
    <Route path='/update-product/:id' element={<UpdateProduct/>}/>
    <Route path='/order' element={<OrderList/>} />
    <Route path='/track-order/:id' element={<OrderTracking/>} />
    <Route path='/order-trans' element={<OrderTransection/>} />
    <Route path='/wearhouse' element={<Inventory/>} />
    <Route path='/received-order' element={<ReceivedOrders/>} />
    <Route path='/purchases' element={<PurchasesList/>} />
    <Route path='/purchases-order' element={<PurchaseOrder/>} />
    <Route path='/purchases-return' element={<PurchaseReturn/>} />
    <Route path='/category' element={<CategoryList/>} />
    <Route path='/create-category' element={<CreateCategory/>} />
    <Route path='/profile' element={<Profile/>} />

    <Route path='/creator' element={<Creator/>} />
    </Route>
    <Route path='signin' element={<SignIn/>}/>
    <Route path='signup' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
