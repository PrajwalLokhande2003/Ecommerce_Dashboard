import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function OrderList() {

    const [order,setOrder] = useState([])
    const [loadClass, setLoadClass] = useState('d-none')
    const [prev,setPrev] = useState('')
    const [next,setNext] = useState('')
    const [curr,setCurr] = useState(Number)
    const [click,setClick] = useState(1)
    const [val,setval] = useState('10')
    const title = 'Order List'

    useEffect(()=>{
        getOrder()
        curr>1?click===curr?setNext('disabled'):setNext(''):click===1?setNext('disabled'):setNext('')
        click===1?setPrev('disabled'):setPrev('')
    },[click,curr,val])
    

    async function getOrder(){
        setLoadClass('d-flex')
        await axios.get('https://dummyjson.com/carts').then(
            (res)=>{
                if(res){
                    setCurr(Math.floor(res.data.carts.length/val)<res.data.carts.length/val?Math.floor(res.data.carts.length/val)+1:res.data.carts.length/val)
                    setOrder(res.data.carts.splice(((click-1)*val),val))
                    
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
                <div className=" container-fluid p-0">

                    <div className="row">
                        <div className=" col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h4 className="card-title mb-2">Payment Refund</h4>
                                            <p className="text-muted fw-medium fs-22 mb-0">490</p>
                                        </div>
                                        <div className=" bg-primary  px-4 py-3 rounded-4">
                                            <i class="bi bi-cash text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h4 className="card-title mb-2">Order Cancel</h4>
                                            <p className="text-muted fw-medium fs-22 mb-0">241</p>
                                        </div>
                                        <div className=" bg-primary  px-4 py-3 rounded-4">
                                            <i class="bi bi-cart-x text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h4 className="card-title mb-2">Order Shipped</h4>
                                            <p className="text-muted fw-medium fs-22 mb-0">630</p>
                                        </div>
                                        <div className=" bg-primary  px-4 py-3 rounded-4">
                                            <i class="bi bi-box-seam text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h4 className="card-title mb-2">Order Delivering</h4>
                                            <p className="text-muted fw-medium fs-22 mb-0">170</p>
                                        </div>
                                        <div className=" bg-primary  px-4 py-3 rounded-4">
                                            <i class="bi bi-truck text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h4 className="card-title mb-2">Pending Review                                            </h4>
                                            <p className="text-muted fw-medium fs-22 mb-0">210</p>
                                        </div>
                                        <div className=" bg-primary  px-4 py-3 rounded-4">
                                            <i class="bi bi-clipboard-x text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" col-md-6 col-xl-3"><div className="card">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 className="card-title mb-2">Pending Payment                                        </h4>
                                        <p className="text-muted fw-medium fs-22 mb-0">600</p>
                                    </div>
                                    <div className=" bg-primary  px-4 py-3 rounded-4">
                                        <i class="bi bi-clock text-primary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div className=" col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h4 className="card-title mb-2">Delivered</h4>
                                            <p className="text-muted fw-medium fs-22 mb-0">200</p>
                                        </div>
                                        <div className=" bg-primary  px-4 py-3 rounded-4">
                                            <i class="bi bi-clipboard-check text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" col-md-6 col-xl-3"><div className="card">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 className="card-title mb-2">In Progress</h4>
                                        <p className="text-muted fw-medium fs-22 mb-0">674</p>
                                    </div>
                                    <div className=" bg-primary  px-4 py-3 rounded-4">
                                        <i class="bi bi-card-text text-primary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>

                    </div>

                    <div class="card  mb-3" >
                        <div class="card-header align-items-center gap-1 fs-3">
                            <div className=" d-flex justify-content-between gap-3">
                                <div className=" card-title align-items-center d-flex">All Order List</div>
                                <div className="align-items-center d-flex w-75"><input type="text" className="search w-100" placeholder="Search Product" /></div>
                                <div className="align-items-center d-flex">

                                <select className=" border-none btn-outline-warning" aria-label="Default select example" style={{height:'fit-content'}} onChange={(e) => setval(e.target.value)}>
                                                <option value="5">5</option>
                                                <option value="10" selected>10</option>
                                                <option value="15">15</option>
                                                <option value="30">30</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div class="card-body ">
                            <div className=" table-responsive">
                                <table className="table align-middle d-table align-items-center fs-3 mb-0 table-hover table-centered">
                                    <thead>
                                        <tr className="headig-tr fs-3 fw-bold align-middle ">
                                            <th>User Id</th>
                                            <th>Total Products</th>
                                            <th>Total Quantity</th>
                                            <th>Total</th>
                                            <th>Discounted Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {order.length>0?
                                        order.map((item)=>
                                            <>
                                            <tr key={item.id}>
                                            <td>{'#'+item.userId}</td>
                                            <td>{item.totalProducts}</td>
                                            <td>{item.totalQuantity}</td>
                                            <td>{item.total}</td>
                                            <td>{item.discountedTotal}</td>
                                            <td>
                                                <div className=" d-flex gap-2">
                                                    <Link className="btn btn-outline-secondary" to={`/track-order/${item.id}`}>
                                                        <i className=" bi bi-eye"></i>
                                                    </Link>
                                                    <Link className="btn btn-primary bg-primary">
                                                        <i class="bi bi-pencil-square text-primary"></i>
                                                    </Link>
                                                    <Link className="btn bg-danger btn-danger opacity-100">
                                                        <i class="bi bi-trash text-danger"></i>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        </>
                                        )
                                        :''}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div>
                                <nav aria-label="...">
                                    <ul class="pagination fs-2 justify-content-end">
                                        <li class={`page-item ${prev}`}>
                                            <button class="page-link" value={1} onClick={()=>setClick(click-1)}>Previous</button>
                                        </li>
                                        <li class="page-item" >
                                            <button className={`page-link ${curr>3?click===1?'active':click===2?'active':'':click===1?'active':''}`} onClick={()=>{setClick(click>=2?1:click)}}>{curr>3?click<=2?click:click>=3?1:click:1}</button>
                                            </li>
                                        {curr>1?
                                        <>
                                        <li class={`page-item`} >
                                            <button className={`page-link ${curr>3?click>2&&click<curr?'active':'':click===2?'active':''}`} onClick={()=>{setClick(click===curr?click-1:click>2?click:click+1);setPrev('')}}>{curr>3?click===curr?click-1:click>=2?click>=3?click:click+1:2:2}</button>
                                        </li>
                                        {curr>=4?<li class="page-item" >
                                            <button class="page-link">...</button>
                                        </li>:''}
                                        {
                                            curr>2?<>
                                            <li class="page-item" >
                                            <button className={`page-link ${click===curr?'active':''}`} onClick={()=>{setClick(curr)}}>{curr}</button>
                                            </li>
                                            </>:''
                                        }
                                        </>:''}
                                        <li class={`page-item ${next}`}>
                                            <button class="page-link" value={1} onClick={()=>setClick(click+1)}>Next</button>
                                        </li>
                                    </ul>
                                </nav>
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

export default OrderList;