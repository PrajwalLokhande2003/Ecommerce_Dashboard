import React, { useState } from "react";
import { Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'


function Nav() {

    const [Navclass, setNavClass] = useState('')

    const rightClick = () => {
        setNavClass({
            navElement: 'hide-nav',
            rightdisplay: 'd-block',
            leftdisplay: 'd-none'
        })
        document.documentElement.setAttribute("data-menu-size", "active")
    }

    const leftClick = () => {
        setNavClass({
            navElement: ' ',
            rightdisplay: 'd-none',
            leftdisplay: 'd-block',
        })
        document.documentElement.setAttribute("data-menu-size", "")

    }

    function logOut(){
        localStorage.clear()
        window.location.reload()
    }


    return (
        <>
        {localStorage.getItem('user')?<>
            <div className={` Nav_bar ${Navclass.navElement} overflow-y-scroll overflow-x-hidden `}>
                <div className="">
                
                    <div className={`bar`}>
                        <div className="company-name row "><div className=" offset-1 col-md-8  "><i className=" bi bi-cart-fill text-danger"></i><span className="logo px-2 text-warning fw-bolder">Wish Mart</span></div></div>
                        
                            <div className=" toggle-btn"><i class={`bi bi-caret-left-fill position-absolute ${Navclass.leftdisplay}`} onClick={() => { rightClick() }}></i>
                                <i className={`bi bi-caret-right-fill position-absolute ${Navclass.rightdisplay} `} onClick={() => { leftClick() }} style={{ display: 'none' }}></i></div>
                       
                            <div class="accordion accordion-flush" id="accordionFlushExample">
                               
                                    <div class="accordion-item">
                                        <Link to={'/'}>
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed no" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            <i class="bi bi-grid"></i> <span className="nav-element">Dashboard</span>
                                        </button>
                                    </h2>
                                    </Link>
                                    {/* <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample"></div> */}
                                </div>
                                    <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            <i class="bi bi-bag"></i> <span className="nav-element">Product</span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">
                                            <ul>
                                                <Link to={'/product'}><li>List</li></Link>
                                                <Link to={'/add-product'}><li>Create</li></Link>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                    <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        <i class="bi bi-file-earmark-plus"></i> <span className="nav-element">Order</span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">
                                            <ul>
                                                <Link to={'/order'}><li>list</li></Link>
                                                <Link to={'/track-order/1'}><li>Track</li></Link>
                                                <Link to={'/order-trans'}><li>Transection</li></Link>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                        <i class="bi bi-box-seam-fill"></i> <span className="nav-element">Inventory</span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">
                                            <ul>
                                                <Link to={'/wearhouse'}><li>Warehouse</li></Link>
                                                <Link to={'received-order'}><li>Received Order</li></Link>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                                        <i class="bi bi-bar-chart-line-fill"></i> <span className="nav-element">Purchases</span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFive" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">
                                            <ul>
                                                <Link to={'/purchases'}><li>List</li></Link>
                                                <Link to={'/purchases-order'}><li>Order</li></Link>
                                                <Link to={'/purchases-return'}><li>Return</li></Link>
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                                        <i class="bi bi-clipboard-data-fill"></i> <span className="nav-element">Category</span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseSix" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">
                                            <ul>
                                                <Link to={'/category'}><li>List</li></Link>
                                                <Link to={'/create-category'}><li>Create</li></Link>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed no" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven" onClick={() => { document.documentElement.setAttribute("data-setting", "active") }}>
                                        <i class="bi bi-gear-fill"></i> <span className="nav-element">Setting</span>
                                        </button>
                                    </h2>
                                </div>

                                <div class="accordion-item text-danger">
                                        <Link to={'/signin'} onClick={logOut}>
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed no" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEghit" aria-expanded="false" aria-controls="flush-collapseOne">
                                            <i class="bi bi-box-arrow-left"></i> <span className="nav-element">LogOut</span>
                                        </button>
                                    </h2>
                                    </Link>
                                </div>


                            </div>

                        
                    </div>

                </div>
            </div>
            
            </>
                            :''}
        </>
    )
}

export default Nav;