import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Header";

const Inventory = () => {


    const title = 'Warehouse'
    const [list, setList] = useState([])
    const [loadClass, setLoadClass] = useState('d-none')
    const [prev, setPrev] = useState('')
    const [next, setNext] = useState('')
    const [curr, setCurr] = useState(Number)
    const [click, setClick] = useState(1)
    const [val, setval] = useState('10')

    const BASE_URL = process.env.REACT_APP_BASE_URL

    useEffect(() => {
        getWH()
        curr > 1 ? click === curr ? setNext('disabled') : setNext('') : click === 1 ? setNext('disabled') : setNext('')
        click === 1 ? setPrev('disabled') : setPrev('')
    }, [click, curr, val])

    async function getWH() {

        await axios.get(`${BASE_URL}/warehouse-list`).then(
            (res) => {
                if (res.data) {
                    setCurr(Math.floor(res.data.length / val) < res.data.length / val ? Math.floor(res.data.length / val) + 1 : res.data.length / val)
                    setList(res.data.splice(((click - 1) * val), val))
                    setLoadClass('d-none')
                }
            }
        ).catch((err) => {
            if (err) {
                setLoadClass('d-none')
            }
        })
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
                                            <h4 className="card-title mb-2">Total Product Items</h4>
                                            <p className="text-muted fw-medium fs-22 mb-0">3521<span className="fs-5"> (Items)</span></p>

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
                                            <h4 className="card-title mb-2">In Stock Product</h4>
                                            <p className="text-muted fw-medium fs-22 mb-0">1311<span className="fs-5"> (Items)</span></p>
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
                                            <h4 className="card-title mb-2">Out Of Stock Product</h4>
                                            <p className="text-muted fw-medium fs-22 mb-0">241<span className="fs-5"> (Items)</span></p>
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
                                            <h4 className="card-title mb-2">Total Visited Customer</h4>
                                            <p className="text-muted fw-medium fs-22 mb-0 gap-2 d-flex align-items-center">2235<span className="fs-5"><span className=" bg-danger text-danger"><i className=" bi bi-arrow-down"></i> 4.3% </span> (Last Week)</span></p>
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
                                <div className=" card-title align-items-center d-flex">Warehouse List</div>
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
                                        <tr className="headig-tr fs-3 fw-bold  align-middle ">
                                            <th>Warehouse ID</th>
                                            <th>Warehouse Name</th>
                                            <th>Location</th>
                                            <th>Manager</th>
                                            <th>Contact Number</th>
                                            <th>Stock Available	</th>
                                            <th>Stock Shipping</th>
                                            <th>Warehouse Revenue</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            list.length > 0 ?
                                                list.map((item) =>
                                                    <>
                                                        <tr>
                                                            <td>{'#' + item.id}</td>
                                                            <td>{item.warehouse_name}</td>
                                                            <td>{item.location}</td>
                                                            <td>{item.manager}</td>
                                                            <td>{item.contact_number}</td>
                                                            <td>{item.stock_available}</td>
                                                            <td>{item.stock_shipping}</td>
                                                            <td>{item.warehouse_revenue}</td>
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
                                            <button class="page-link" value={1} onClick={() => setClick(click - 1)}>Previous</button>
                                        </li>
                                        <li class="page-item" >
                                            <button className={`page-link ${curr > 3 ? click === 1 ? 'active' : click === 2 ? 'active' : '' : click === 1 ? 'active' : ''}`} onClick={() => { setClick(click >= 2 ? 1 : click) }}>{curr > 3 ? click <= 2 ? click : click >= 3 ? 1 : click : 1}</button>
                                        </li>
                                        {curr > 1 ?
                                            <>
                                                <li class={`page-item`} >
                                                    <button className={`page-link ${curr > 3 ? click > 2 && click < curr ? 'active' : '' : click === 2 ? 'active' : ''}`} onClick={() => { setClick(click === curr ? click - 1 : click > 2 ? click : click + 1); setPrev('') }}>{curr > 3 ? click === curr ? click - 1 : click >= 2 ? click >= 3 ? click : click + 1 : 2 : 2}</button>
                                                </li>
                                                {curr >= 4 ? <li class="page-item" >
                                                    <button class="page-link">...</button>
                                                </li> : ''}
                                                {
                                                    curr > 2 ? <>
                                                        <li class="page-item" >
                                                            <button className={`page-link ${click === curr ? 'active' : ''}`} onClick={() => { setClick(curr) }}>{curr}</button>
                                                        </li>
                                                    </> : ''
                                                }
                                            </> : ''}
                                        <li class={`page-item ${next}`}>
                                            <button class="page-link" value={1} onClick={() => setClick(click + 1)}>Next</button>
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

export default Inventory;