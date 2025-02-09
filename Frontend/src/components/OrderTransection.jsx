import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

function OrderTransection() {

    const [list, setList] = useState([])

    const BASE_URL = process.env.REACT_APP_BASE_URL

    const title = 'Order Transection'

    const [loadClass, setLoadClass] = useState('d-none')
    
        const [prev, setPrev] = useState('')
        const [next, setNext] = useState('')
        const [curr, setCurr] = useState(Number)
        const [click, setClick] = useState(1)
        const [val, setval] = useState('10')

    useEffect(() => {
            getTrans()
            curr > 1 ? click === curr ? setNext('disabled') : setNext('') : click === 1 ? setNext('disabled') : setNext('')
            click === 1 ? setPrev('disabled') : setPrev('')
        }, [click, curr, val])

    async function getTrans() {

        setLoadClass('d-flex')

        await axios.get(`${BASE_URL}/transection-list`).then(
            (res) => {
                setCurr(Math.floor(res.data.length/val)<res.data.length/val?Math.floor(res.data.length/val)+1:res.data.length/val)
                    setList(res.data.splice(((click-1)*val),val))
                    setLoadClass('d-none')
            }).catch(
                (err) => {
                    if (err) {
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
                    <div class="card  mb-3" >
                    <div class="card-header align-items-center gap-1 fs-3">
                            <div className=" d-flex justify-content-between gap-3">
                                <div className=" card-title align-items-center d-flex">All Product List</div>
                                <div className="align-items-center d-flex w-75"><input type="text" className="search w-100" placeholder="Search" /></div>
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
                                        <tr className="headig-tr fs-3 fw-bold bg-light-subtle align-middle ">
                                            <th>ID</th>
                                            <th>Order By</th>
                                            <th>Items</th>
                                            <th>Purchase Status</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Payment Method</th>
                                            <th>Payment Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            list.length > 0 ?
                                                list.map((item) =>
                                                    <>
                                                        <tr>
                                                            <td>{'#' + item.tid}</td>
                                                            <td>{item.order_by}</td>
                                                            <td>{item.item}</td>
                                                            <td>
                                                                <span className={`badge py-1 px-2 bg-opacity-75 ${item.purchase_status === 'item received' ? 'bg-success' : item.purchase_status === 'pending' ? 'bg-warning' : 'bg-danger'}`}>
                                                                    {item.purchase_status}
                                                                </span>
                                                            </td>
                                                            <td>{item.date}</td>
                                                            <td>{item.total}</td>
                                                            <td>{item.payment_method}</td>
                                                            <td>
                                                                <span className={`badge py-1 px-2 bg-opacity-75 ${item.payment_tatus === 'complete' ? 'bg-success' : item.payment_tatus === 'pending' ? 'bg-warning' : 'bg-danger'}`}>
                                                                    {item.payment_tatus}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className=" d-flex gap-2">
                                                                    <a className="btn btn-outline-secondary">
                                                                        <i className=" bi bi-eye"></i>
                                                                    </a>
                                                                    <a className="btn btn-primary bg-primary">
                                                                        <i class="bi bi-pencil-square text-primary"></i>
                                                                    </a>
                                                                    <a className="btn bg-danger btn-danger opacity-100">
                                                                        <i class="bi bi-trash text-danger"></i>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </>)
                                                : ''
                                        }
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

export default OrderTransection;