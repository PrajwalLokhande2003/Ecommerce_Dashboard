import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";


function CategoryList() {

    const title = 'Categories'
    const [loadClass, setLoadClass] = useState('d-none')

    const [list, setList] = useState([])
    const [prev, setPrev] = useState('')
        const [next, setNext] = useState('')
        const [curr, setCurr] = useState(Number)
        const [click, setClick] = useState(1)
        const [val, setval] = useState('10')

    const BASE_URL = process.env.REACT_APP_BASE_URL

    useEffect(() => {
            getCate()
            curr > 1 ? click === curr ? setNext('disabled') : setNext('') : click === 1 ? setNext('disabled') : setNext('')
            click === 1 ? setPrev('disabled') : setPrev('')
        }, [click, curr, val])

    async function getCate() {
        setLoadClass('d-flex')

        await axios.get(`${BASE_URL}/categorie-list`).then(
            (res) => {
                if (res) {
                    setCurr(Math.floor(res.data.length/val)<res.data.length/val?Math.floor(res.data.length/val)+1:res.data.length/val)
                    setList(res.data.splice(((click-1)*val),val))
                    setLoadClass('d-none')

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
                        <div className="col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="rounded bg-secondary-subtle d-flex align-items-center justify-content-center mx-auto">
                                        <img src="https://techzaa.in/larkon/admin/assets/images/product/p-1.png" className=" avatar-xl" alt="..." />
                                    </div>
                                    <h4 class="mt-3 mb-0">Fashion Categories</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="rounded bg-secondary-subtle d-flex align-items-center justify-content-center mx-auto">
                                        <img src="https://techzaa.in/larkon/admin/assets/images/product/p-6.png" className=" avatar-xl" alt="..." />
                                    </div>
                                    <h4 class="mt-3 mb-0">Electronics Headphone</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="rounded bg-secondary-subtle d-flex align-items-center justify-content-center mx-auto">
                                        <img src="https://techzaa.in/larkon/admin/assets/images/product/p-7.png" className=" avatar-xl" alt="..." />
                                    </div>
                                    <h4 class="mt-3 mb-0">Foot Wares</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="rounded bg-secondary-subtle d-flex align-items-center justify-content-center mx-auto">
                                        <img src="https://techzaa.in/larkon/admin/assets/images/product/p-9.png" className=" avatar-xl" alt="..." />
                                    </div>
                                    <h4 class="mt-3 mb-0">Eye Ware & Sunglass</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card  mb-3" >
                    <div class="card-header align-items-center gap-1 fs-3">
                            <div className=" d-flex justify-content-between gap-3">
                                <div className=" card-title align-items-center d-flex">All Categories</div>
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
                                        <tr className="headig-tr fs-3 fw-bold bg-light-subtle align-middle ">
                                            <th>Categories</th>
                                            <th>Starting Price</th>
                                            <th>Create by</th>
                                            <th>ID</th>
                                            <th>Product Stock</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                                    <img src="https://techzaa.in/larkon/admin/assets/images/product/p-1.png" className=" avatar-md" alt="..." />
                                                    </div>
                                                <p>Fashion Men , Women & Kid's</p>
                                                </div>
                                                </td>
                                            <td>$80 to $400</td>
                                            <td>Seller</td>
                                            <td>FS16276</td>
                                            <td>46233</td>
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

                                        {
                                            list.length>0? list.map(item=>
                                                <>
                                                <tr>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                                    <img src={item.image} className=" avatar-md" alt="..." />
                                                    </div>
                                                <p>{item.title}</p>
                                                </div>
                                                </td>
                                            <td>{'$'+item.price}</td>
                                            <td>{item.creator_name}</td>
                                            <td>{'#'+item.tag_id}</td>
                                            <td>{item.stock}</td>
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
                                                </>
                                            ):''
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

export default CategoryList;