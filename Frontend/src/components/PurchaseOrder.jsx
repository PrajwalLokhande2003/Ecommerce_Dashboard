import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

function PurchaseOrder() {

    const title = 'Purchase Order'

    const [loadClass, setLoadClass] = useState('d-none')

    const [list, setList] = useState([])
    const [prev, setPrev] = useState('')
    const [next, setNext] = useState('')
    const [curr, setCurr] = useState(Number)
    const [click, setClick] = useState(1)
    const [val, setval] = useState('10')

    const OTHER_URL = process.env.REACT_APP_OTHER_URL

    useEffect(() => {
            getItem()
            curr > 1 ? click === curr ? setNext('disabled') : setNext('') : click === 1 ? setNext('disabled') : setNext('')
            click === 1 ? setPrev('disabled') : setPrev('')
        }, [click, curr, val])

    async function getItem() {
        setLoadClass('d-flex')

        await axios.get(`${OTHER_URL}/users/`).then(
            (res) => {
                if (res.data) {
                    setLoadClass('d-none')
                    setCurr(Math.floor(res.data.users.length/val)<res.data.users.length/val?Math.floor(res.data.users.length/val)+1:res.data.users.length/val)
                    setList(res.data.users.splice(((click-1)*val),val))

                }
            }
        ).catch(
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

                    <div className="row">

                        <div className=" col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h4 className="card-title mb-2">Total Orders</h4>
                                            <p className="text-muted fw-medium fs-22 mb-0 gap-2 d-flex align-items-center">442<span className="fs-5"><span className=" bg-danger text-danger"><i className=" bi bi-arrow-down"></i> 6.9% </span> (Last Week)</span></p>

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
                                            <h4 className="card-title mb-2">Order Items Over Time</h4>
                                            <p className="text-muted fw-medium fs-22 mb-0 gap-2 d-flex align-items-center">231<span className="fs-5"><span className=" bg-success text-success"><i className=" bi bi-arrow-up"></i> 13.5% </span> (Last Week)</span></p>
                                        </div>
                                        <div className=" bg-primary  px-4 py-3 rounded-4">
                                            <i class="bi bi-cart-check text-primary"></i>
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
                                            <h4 className="card-title mb-2">Return Order</h4>
                                            <p className="text-muted fw-medium fs-22 mb-0 gap-2 d-flex align-items-center">367<span className="fs-5"><span className=" bg-success text-success"><i className=" bi bi-arrow-up"></i> 2.1% </span> (Last Week)</span></p>
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
                                            <h4 className="card-title mb-2">Fulfilled Orders Over Time</h4>
                                            <p className="text-muted fw-medium fs-22 mb-0 gap-2 d-flex align-items-center">232<span className="fs-5"><span className=" bg-danger text-danger"><i className=" bi bi-arrow-down"></i> 4.3% </span> (Last Week)</span></p>
                                        </div>
                                        <div className=" bg-primary  px-4 py-3 rounded-4">
                                            <i class="bi bi-people text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div class="card  mb-3" >
                        <div class="card-header align-items-center gap-1 fs-3">
                            <div className=" d-flex justify-content-between gap-3">
                                <div className=" card-title align-items-center d-flex">All Order Item</div>
                                <div className="align-items-center d-flex w-75"><input type="text" className="search w-100" placeholder="Search" /></div>
                                <div className="align-items-center d-flex">

                                    <select className=" border-none btn-outline-warning" aria-label="Default select example" style={{ height: 'fit-content' }} onChange={(e) => setval(e.target.value)}>
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
                                            <th>Customer Name</th>
                                            <th>Email</th>
                                            <th>Order Date</th>
                                            <th>Total</th>
                                            <th>Order Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            list.length > 0 ? list.map(item =>
                                                <>
                                                    <tr>
                                                        <td>

                                                            <div className="d-flex align-items-center gap-2">
                                                                <img src={item.image} className=" avatar rounded-circle" alt="..." />
                                                                <p className=" fw-semibold">{`${item.firstName} ${item.lastName} `}</p>
                                                            </div>
                                                        </td>
                                                        <td>{item.email.replace('x.dummyjson', 'test')}</td>
                                                        <td>{item.birthDate.replace('1', '2').replace('9', '0').replace('8', '2').replace('9', '1').replace('8', '2').replace('7', '0')}</td>
                                                        <td>{Math.floor(item.height + item.weight)}</td>
                                                        <td>
                                                            <span className={`badge py-1 px-2 bg-opacity-75 ${item.eyeColor.replace('Green', 'Item received').replace('Red', 'Item received').replace('Hazel', 'Item received').replace('Brown', 'Item received').replace('Violet', 'pending').replace('Blue', 'pending').replace('Gray', 'pending').replace('Amber', 'cancel') === 'Item received' ? 'bg-success' : item.eyeColor.replace('Green', 'Item received').replace('Red', 'Item received').replace('Hazel', 'Item received').replace('Brown', 'Item received').replace('Violet', 'pending').replace('Blue', 'pending').replace('Gray', 'pending').replace('Amber', 'cancel') === 'pending' ? 'bg-warning' : 'bg-danger'}`}>
                                                                {item.eyeColor.replace('Green', 'Item received').replace('Red', 'Item received').replace('Hazel', 'Item received').replace('Brown', 'Item received').replace('Violet', 'pending').replace('Blue', 'pending').replace('Gray', 'pending').replace('Amber', 'cancel')}
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
                                                    </tr></>
                                            ) : ''
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

export default PurchaseOrder;