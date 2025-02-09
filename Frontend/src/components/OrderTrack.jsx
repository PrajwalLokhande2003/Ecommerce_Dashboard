import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function OrderTracking() {

    const [product,setProduct] = useState([])
    const [loadClass, setLoadClass] = useState('d-none')

    const param = useParams()
    const title = 'Create product'

    useEffect(()=>{
        getProduct()
    },[])

    async function getProduct(){
        setLoadClass('d-flex')
        await axios.get(`https://dummyjson.com/carts`).then(
            (res)=>{
                if(res.data){
                    setProduct(res.data.carts[param.id-1].products)
                    if(res.data){
                        setLoadClass('d-none')
                    }
                }
            }
        ).catch(
            (err)=>{
                if(err){
                    setLoadClass('d-none') 
                }
            }
        )
    }

    return (
        <>
        <Header title={title} />
            <div className=" product main-sec">
                <div className=" container-fluid">
                    <div className="row">
                        <div className="card">
                        <div class="card-header align-items-center gap-1 fs-3">
                            <div className=" d-flex justify-content-between gap-3">
                                <div className=" card-title align-items-center d-flex">Order Id</div>
                                <div className="align-items-center d-flex w-50"><input type="text" className="search w-100" placeholder="Enter Order Id" />
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="card">
                            <div className=" card-header">
                                <h3>Product</h3>
                            </div>
                            <div class="card-body ">
                                <div className=" table-responsive">
                                    <table className="table align-middle d-table align-items-center fs-3 mb-0 table-hover table-centered">
                                        <thead>
                                            <tr className="headig-tr fs-3 fw-bold align-middle ">
                                                <th>Product Name & Image</th>
                                                <td>Product Id</td>
                                                <td>Price</td>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                <td>Discount Percentage</td>
                                                <th>Discounted Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {product.length>0?
                                        product.map((item)=>
                                            <>
                                            <tr key={item.id}>
                                                <td>
                                                <div className="d-flex align-items-center gap-2">
                                                        <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                                            <img src={item.thumbnail} className=" avatar-md" alt="..." />
                                                        </div>
                                                        <p className=" fw-semibold">{item.title}</p>
                                                    </div>
                                                </td>
                                            <td>{'#'+item.id}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.total}</td>
                                            <td>{item.discountPercentage}</td>
                                            <td>{item.discountedTotal}</td>
                                            
                                        </tr>
                                        </>
                                        )
                                        :''}
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="card">
                            <div className=" card-header">
                                <h3>Detail</h3>
                                <h5>Your items is on the way. Tracking information will be available within 24 hours.</h5>

                            </div>
                            <div className="card-body">
                                <div className="track-map">
                                    <div className="line">
                                        <div className="line1 w-100"></div></div>
                                    <div className="circle">
                                        <div className="circle1 bg-primary w-100 bg-opacity-100"><i class="bi bi-check2 fs-1 text-white m-auto"></i></div>
                                        <div className=" p-3 fs-4 text-dark font-weight-bolder d-flex gap-2 justify-content-center "> <i class="bi bi-clipboard-check m-auto"></i> <div>Order Confirmed</div></div></div>
                                    <div className="line">
                                        <div className="line1"></div></div>
                                    <div className="circle">
                                        <div className="circle1 w-100 bg-opacity-100"><i class="bi bi-check2 fs-1 text-white m-auto"></i></div>
                                        <div className=" p-3 fs-4 text-dark font-weight-bolder d-flex gap-2 justify-content-center"> <i class="bi bi-box-seam-fill m-auto"></i> <div>Order Shipped</div></div></div>
                                    <div className="line">
                                        <div className="line1"></div></div>
                                    <div className="circle">
                                        <div className="circle1 w-100 bg-opacity-100"><i class="bi bi-check2 fs-1 text-white m-auto"></i></div>
                                        <div className=" p-3 fs-4 text-dark font-weight-bolder d-flex gap-2 justify-content-center"> <i class="bi bi-truck m-auto"></i> <div>Out for Delivery</div></div></div>
                                    <div className="line">
                                        <div className="line1"></div></div>
                                    <div className="circle">
                                        <div className="circle1 w-100 bg-opacity-100"><i class="bi bi-check2 fs-1 text-white m-auto"></i></div>
                                        <div className=" p-3 fs-4 text-dark font-weight-bolder d-flex gap-2 justify-content-center"> <i class="bi bi-house-check-fill m-auto"></i> <div>Order Delivered</div></div></div>
                                    <div className="line">
                                        <div className="line1"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="card">
                            <div className="card-body">
                                <div className=" table-responsive">
                                    <table className="table align-middle mb-0 table-hover table-centered">
                                        <thead>
                                            <tr className="headig-tr fw-bold bg-light-subtle">
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Description</th>
                                                <th>Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>12-01-25</td>
                                                <td>10:39 AM</td>
                                                <td>xyz</td>
                                                <td>loni</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>


            <div className={`position-fixed top-0 w-100 h-100 z-3 bg-light  bg-opacity-50 ${loadClass}`}>
                <div class="spinner-grow m-auto" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>


        </>
    )
}

export default OrderTracking;