import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function UpdateProduct() {

    const title = 'Update product'

    const [dis, setDis] = useState('d-none')
    
    const [image, setImage] = useState('')
    const [display, setDisplay] = useState('')
    const [Name, setName] = useState('')
    const [Price, setPrice] = useState('')
    const [Discount, setDiscount] = useState('')
    const [categorie, setCategorie] = useState('')
    const [brand, setBrand] = useState('')
    const [weight, setWeight] = useState('')
    const [description, setDescription] = useState('')
    const [tagNumber, setTagNumber] = useState('')
    const [stock, setStock] = useState('')
    const [tax, setTax] = useState('')
    const [color, setColor] = useState([])
    const [size, setSize] = useState([])
    const [loadClass, setLoadClass] = useState('d-none')

    const BASE_URL = process.env.REACT_APP_BASE_URL

    const param = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getProduct()
    }, [])

    async function getProduct() {

        setLoadClass('d-flex')


        await axios.get(`${BASE_URL}/update-product-data/${param.id}`).then(
            (res) => {
                if (res) {
                    setDisplay(res.data[0].image)
                    setName(res.data[0].product_name)
                    setPrice(res.data[0].price)
                    setSize(res.data[0].size.split(','))
                    setColor(res.data[0].color.split(','))
                    setDiscount(res.data[0].discount)
                    setCategorie(res.data[0].product_categories)
                    setWeight(res.data[0].weight)
                    setStock(res.data[0].stock)

                    if(res.data[0]){
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



    async function updateProduct() {

        setLoadClass('d-flex')

        const formData = new FormData()
        formData.append('product_name', Name)
        formData.append('product_categories', categorie)
        formData.append('brand', brand)
        formData.append('weight', weight)
        formData.append('size', size)
        formData.append('color', color)
        formData.append('tag_number', tagNumber)
        formData.append('stock', stock)
        formData.append('price', Price)
        formData.append('discount', Discount)
        formData.append('tax', tax)

        await axios.put(`${BASE_URL}/update-product/${param.id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            (res) => {
                if (res) {
                    setLoadClass('d-none')
                    navigate('/product')
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

    const handelColorCheck = (e) => {
        !e.target.checked ? setColor([...color, e.target.value]) : setColor(color.filter((a, i) => e.target.value !== color[i]))

    }
    const handelSizeCheck = (e) => {
        !e.target.checked ? setSize([...size, e.target.value]) : setSize(size.filter((a, i) => e.target.value !== size[i]))
    }


    const UpdateImg = async() =>{

        setLoadClass('d-flex')

        const formData = new FormData()
        formData.append('image', image)
        await axios.put(`${BASE_URL}/update-product-img/${param.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
            (res) => {
                if (res) {
                    setLoadClass('d-none')
                    navigate(`/product`)
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
                        <div className=" col-xl-3 col-lg-4">
                            <div class="card">
                                <div className=" p-5">
                                    <div className=" d-flex justify-content-end">
                                        <Link className="btn btn-primary bg-primary position-absolute " to={``} onClick={() => setDis('d-block')}>
                                            <i class="bi bi-pencil-square text-primary"></i>
                                        </Link>
                                        <img src={display} class="card-img-top p-4 bg-light rounded-4" alt="..." />
                                    </div>
                                </div>
                                <div class="card-body p-4">
                                    <div className=" card-header">
                                        <h1 class="card-title ">{Name}</h1>
                                    </div>
                                    <div className=" d-flex gap-3 align-items-center flex-wrap">
                                        <span>Price : </span>
                                        <span className={Discount ? 'text-decoration-line-through text-muted' : 'text-decoration-none'}> {Price ? '$' + Price : ''} </span>
                                        <span> {Discount ? ('$' + (Price - (Price * Discount / 100))) : ''} </span>
                                        <span className="fs-4">{Discount ? '(' + Discount + '% off)' : ''}</span>
                                    </div>
                                    <div>
                                        <span>Size :
                                            <div className="d-flex flex-wrap gap-2 mt-2">

                                                {size.map(a =>
                                                    a.length > 0 ?
                                                        <><input type="checkbox" class="btn-check" autocomplete="off" />
                                                            <label class="btn btn-light wrem-4  d-flex justify-content-center align-items-center form-label" for={a}>
                                                                {a}
                                                            </label>
                                                        </> : '')
                                                }

                                            </div>
                                        </span>
                                    </div>
                                    <div className="row">
                                        <span>Color : </span>
                                        <div className="d-flex flex-wrap gap-2 mt-2">
                                            {color.map(a =>
                                                a.length > 0 ? <>
                                                    <div>
                                                        <input type="checkbox" class="btn-check" autocomplete="off" /><label class="btn btn-light wrem-4  d-flex justify-content-center align-items-center form-label" for={a}>
                                                            <i className={` bi bi-circle-fill ${a}`}></i>
                                                        </label>
                                                    </div>
                                                </> : ''
                                            )}

                                        </div>

                                    </div>
                                    <button class="btn btn-outline-secondary" onClick={updateProduct}>Update Product</button>
                                </div>
                            </div>
                        </div>
                        <div className=" col-xl-9 col-lg-8">

                            <div className="row">
                                <div class="card">
                                    <div class="card-header">
                                        <h2 class="card-title">Product Information</h2>
                                    </div>
                                    <div class="card-body">
                                        <div className="row">
                                            <div className=" col-md-6 d-grid my-4">
                                                <label className=" form-label">Product Name</label>
                                                <input placeholder="Item Name" className=" form-control" value={Name} onChange={e => setName(e.target.value)} />
                                            </div>
                                            <div className=" col-md-6 d-grid my-4">
                                                <label className=" form-label">Product Categories</label>
                                                <select class="form-select" aria-label="Default select example" value={categorie} onChange={e => setCategorie(e.target.value)}>
                                                    <option selected>Choose a categories</option>
                                                    <option value="Appliances">Appliances</option>
                                                    <option value="Electronics">Electronics</option>
                                                    <option value="Fashion">Fashion</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4 my-4 ">
                                                <label className=" form-label">Brand</label>
                                                <input placeholder="Brand Name" className=" form-control" value={brand} onChange={e => setBrand(e.target.value)} />
                                            </div>
                                            <div className="col-md-4 my-4">
                                                <label className=" form-label">Weight</label>
                                                <input placeholder="In gm & kg" className=" form-control" value={weight} onChange={e => setWeight(e.target.value)} />
                                            </div>
                                            <div className="col-md-4 my-4"></div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 my-4">Size :
                                                <div className="d-flex flex-wrap gap-2 mt-2">
                                                    <input type="checkbox" class="btn-check" id="XS" autocomplete="off" value="XS" onChange={(e) => { handelSizeCheck(e) }} />
                                                    <label class="btn btn-light wrem-4  d-flex justify-content-center align-items-center form-label" for="XS">XS</label>

                                                    <input type="checkbox" class="btn-check" id="S" autocomplete="off" value="S" onChange={(e) => { handelSizeCheck(e) }} />
                                                    <label class="btn btn-light wrem-4 rounded d-flex justify-content-center align-items-center form-label" for="S">S</label>

                                                    <input type="checkbox" class="btn-check" id="M" autocomplete="off" value="M" onChange={(e) => { handelSizeCheck(e) }} />
                                                    <label class="btn btn-light wrem-4 rounded d-flex justify-content-center align-items-center form-label" for="M">M</label>

                                                    <input type="checkbox" class="btn-check" id="XL" autocomplete="off" value="XL" onChange={(e) => { handelSizeCheck(e) }} />
                                                    <label class="btn btn-light wrem-4 rounded d-flex justify-content-center align-items-center form-label" for="XL">XL</label>

                                                    <input type="checkbox" class="btn-check" id="XLL" autocomplete="off" value="XLL" onChange={(e) => { handelSizeCheck(e) }} />
                                                    <label class="btn btn-light wrem-4 rounded d-flex justify-content-center align-items-center form-label" for="XLL">XXL</label>

                                                    <input type="checkbox" class="btn-check" id="3XL" autocomplete="off" value="3XL" onChange={(e) => { handelSizeCheck(e) }} />
                                                    <label class="btn btn-light wrem-4 rounded d-flex justify-content-center align-items-center form-label" for="3XL">3XL</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 my-4">
                                                Color :
                                                <div className="d-flex flex-wrap gap-2 mt-2">
                                                    <input type="checkbox" class="btn-check" id="black" autocomplete="off" value="black" onChange={(e) => { handelColorCheck(e) }} />
                                                    <label class="btn btn-light wrem-4  d-flex justify-content-center align-items-center form-label" for="black">
                                                        <i className=" bi bi-circle-fill"></i>
                                                    </label>

                                                    <input type="checkbox" class="btn-check" id="text-warning" autocomplete="off" value="text-warning" onChange={(e) => { handelColorCheck(e) }} />
                                                    <label class="btn btn-light wrem-4 rounded d-flex justify-content-center align-items-center form-label" for="text-warning">
                                                        <i className=" bi bi-circle-fill text-warning"></i>
                                                    </label>

                                                    <input type="checkbox" class="btn-check" id="text-danger" autocomplete="off" value="text-danger" onChange={(e) => { handelColorCheck(e) }} />
                                                    <label class="btn btn-light wrem-4 rounded d-flex justify-content-center align-items-center form-label" for="text-danger">
                                                        <i className=" bi bi-circle-fill text-danger"></i>
                                                    </label>

                                                    <input type="checkbox" class="btn-check" id="text-primary" autocomplete="off" value="text-primary" onChange={(e) => { handelColorCheck(e) }} />
                                                    <label class="btn btn-light wrem-4 rounded d-flex justify-content-center align-items-center form-label" for="text-primary">
                                                        <i className=" bi bi-circle-fill text-primary"></i>
                                                    </label>

                                                    <input type="checkbox" class="btn-check" id="text-success" autocomplete="off" value="text-success" onChange={(e) => { handelColorCheck(e) }} />
                                                    <label class="btn btn-light wrem-4 rounded d-flex justify-content-center align-items-center form-label" for="text-success">
                                                        <i className=" bi bi-circle-fill text-success"></i>
                                                    </label>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <label className=" form-label"> Description</label>
                                            <textarea placeholder="Short description abiut product" className=" form-control" rows={6} value={description} onChange={e => setDescription(e.target.value)}></textarea>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4 my-4">
                                                <label className=" form-label">Tag Number</label>
                                                <input type="number" className=" form-control" placeholder="#****" value={tagNumber} onChange={e => setTagNumber(e.target.value)} />
                                            </div>
                                            <div className="col-md-4 my-4">
                                                <label className="form-label">Stock</label>
                                                <input type="number" className=" form-control" placeholder="Quantity" value={stock} onChange={e => setStock(e.target.value)} />
                                            </div>
                                            <div className="col-md-4 my-4">
                                                <label className=" form-label">tag</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div class="card">
                                    <div class="card-header">
                                        <h2 class="card-title">Pricing Details</h2>
                                    </div>
                                    <div class="card-body">
                                        <div className="row">
                                            <div className="col-md-4 my-4">
                                                <label className=" form-label">Price</label>
                                                <div className=" input-group mb-3">
                                                    <span className=" input-group-text fs-2"><i className="bi bi-currency-dollar"></i></span>
                                                    <input type="number" className=" form-control fs-2" placeholder="000" value={Price} onChange={e => setPrice(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-md-4 my-4">
                                                <label className=" form-label">Discount</label>
                                                <input type="number" className=" form-control" placeholder="000" value={Discount} onChange={e => setDiscount(e.target.value)} />
                                            </div>
                                            <div className="col-md-4 my-4">
                                                <label className=" form-label">Tax</label>
                                                <input type="number" className=" form-control" placeholder="000" value={tax} onChange={e => setTax(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </div>

            <div className={`main-sec w-100 h-100 m-auto my-0 position-fixed z-10000 overflow-scroll top-0 ${dis}`} style={{ backdropFilter: 'blur(5px)' }}>
                <div className=" container-fluid my-0 w-75 bg-transparent">
                    <div className="row">
                        <div class="card">
                            <div className=" position-absolute d-flex justify-content-end w-100" onClick={()=>setDis('d-none')}>
                                <i class="bi bi-x-square text-danger cursor-pointer justify-content-end btn fs-1"></i>
                            </div>
                            <div class="card-header">
                                <h2 class="card-title">Add Product Photo</h2>
                            </div>
                            <div class="card-body">

                                <div className="row mb-3">
                                    <img src={display} class="card-img-top p-4 w-50 m-auto bg-light rounded-4" alt="..." />
                                </div>
                                <label for="add" className="upload form-control m-auto mb-3 w-50" >Upload</label>
                                <input type="file" className=" invisible d-none" accept="image/*" id="add" onChange={(e) => { setDisplay(URL.createObjectURL(e.target.files[0])); setImage(e.target.files[0]) }} />
                                <div className=" w-100 text-center "><button class="btn btn-success" onClick={UpdateImg}>Update Image</button></div>
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

export default UpdateProduct;