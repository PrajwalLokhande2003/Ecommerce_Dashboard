import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Link } from 'react-router-dom'

const ProductList = () => {

    const [product, setProduct] = useState([])
    const [loadClass, setLoadClass] = useState('d-none')
    const [prev, setPrev] = useState('')
    const [next, setNext] = useState('')
    const [curr, setCurr] = useState(Number)
    const [click, setClick] = useState(1)
    const [val, setval] = useState('10')

    const title = 'Product List'
    const BASE_URL = process.env.REACT_APP_BASE_URL
    // const creatorId = JSON.parse(localStorage.getItem('user')).id


    useEffect(() => {
        getProduct()
        curr > 1 ? click === curr ? setNext('disabled') : setNext('') : click === 1 ? setNext('disabled') : setNext('')
        click === 1 ? setPrev('disabled') : setPrev('')
    }, [click, curr, val])



    async function getProduct() {
        setLoadClass('d-flex')


        await axios.get(`${BASE_URL}/product-list`).then(
            (res) => {
                if (res.data) {
                    setCurr(Math.floor(res.data.length/val)<res.data.length/val?Math.floor(res.data.length/val)+1:res.data.length/val)
                    setProduct(res.data.splice(((click-1)*val),val))
                    setLoadClass('d-none')
                }
            }
        ).catch((err)=>{
            if(err){
                setLoadClass('d-none')
            }
        })
    }

    async function deleteProduct(id) {
        setLoadClass('d-flex')

        await axios.delete(`${BASE_URL}/delete-product/${id}`).then(
            (res) => {
                if (res) {
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

                    <div class="card  mb-3" >
                    <div class="card-header align-items-center gap-1 fs-3">
                            <div className=" d-flex justify-content-between gap-3">
                                <div className=" card-title align-items-center d-flex">All Product List</div>
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
                                <table className="table fs-3 align-middle mb-0 table-hover table-centered">
                                    <thead>
                                        <tr className="headig-tr fw-bold ">
                                            <th>Product Name & Image</th>
                                            <th>Tag Number</th>
                                            <th>Size</th>
                                            <th>Color</th>
                                            <th>Price</th>
                                            <th>Discount</th>
                                            <th>Stock</th>
                                            <th>Category</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {product.length>0?
                                        product.map(item =>
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                                            <img src={item.image} className=" avatar-md" alt="..." />
                                                        </div>
                                                        <p className=" fw-semibold">{item.product_name}</p>
                                                    </div>
                                                </td>
                                                <td>{'#' + item.tag_number}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        {item.size.split(",").map(a =>
                                                            a.length > 0 ? <div class="btn btn-outline-secondary fs-5 d-flex justify-content-center align-items-center form-label">
                                                                {a}
                                                            </div> : '')}
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="d-flex">
                                                        {item.color.split(",").map(a =>
                                                            a.length > 0 ? <div class="btn btn-outline-secondary fs-5 d-flex justify-content-center align-items-center form-label">
                                                                <i className={` bi bi-circle-fill ${a}`}></i>
                                                            </div> : '')}
                                                    </div>
                                                </td>
                                                <td>{item.price}</td>
                                                <td>{item.discount}</td>
                                                <td>{item.stock}</td>
                                                <td>{item.product_categories}</td>
                                                <td>
                                                    <div className=" d-flex gap-2">
                                                        <a className="btn btn-outline-secondary">
                                                            <i className=" bi bi-eye"></i>
                                                        </a>
                                                        <Link className="btn btn-primary bg-primary" to={`/update-product/${item.id}`}>
                                                            <i class="bi bi-pencil-square text-primary"></i>
                                                        </Link>
                                                        <a className="btn bg-danger btn-danger opacity-100" onClick={() => { deleteProduct(item.id) }}>
                                                            <i class="bi bi-trash text-danger"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ):''}
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

export default ProductList;