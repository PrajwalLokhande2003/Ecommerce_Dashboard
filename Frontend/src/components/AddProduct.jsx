import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function AddProduct() {

    const title = 'Create product'

    const [display, setDisplay] = useState('')
    const [image, setImage] = useState('')
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
    const creatorId = JSON.parse(localStorage.getItem('user')).id

    const navigate = useNavigate()



    async function addProcut() {

        setLoadClass('d-flex')


        const formData = new FormData()
        formData.append('image', image)
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
        formData.append('creator_id', creatorId)

        await axios.post(`${BASE_URL}/create-product`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(
            (res) => {
                if (res) {
                    setLoadClass('d-none')
                    navigate('/product')
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

    const handelColorCheck = (e) => {
        e.target.checked ? setColor([...color, e.target.value]) : setColor(color.filter((a, i) => e.target.value !== color[i]))
    }
    const handelSizeCheck = (e) => {
        e.target.checked ? setSize([...size, e.target.value]) : setSize(size.filter((a, i) => e.target.value !== size[i]))

    }


    return (
        <>

            <Header title={title} />
            <div className=" product main-sec">
                <div className=" container-fluid">
                    <div className="row">
                        <div className=" col-xl-3 col-lg-4">
                            <div class="card">
                                <img src={display} class="card-img-top p-4 rounded-4" alt="..." />
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
                                                    <><input type="checkbox" class="btn-check" autocomplete="off" />
                                                        <label class="btn btn-light wrem-4  d-flex justify-content-center align-items-center form-label" for={a}>
                                                            {a}
                                                        </label></>)}

                                            </div>
                                        </span>
                                    </div>
                                    <div className="row">
                                        <span>Color : </span>
                                        <div className="d-flex flex-wrap gap-2 mt-2">
                                            {color.map(a =>

                                                <>
                                                    <div>
                                                        <input type="checkbox" class="btn-check" autocomplete="off" />
                                                        <label class="btn btn-light wrem-4  d-flex justify-content-center align-items-center form-label" for={a}>
                                                            <i className={` bi bi-circle-fill ${a}`}></i>
                                                        </label>
                                                    </div>
                                                </>

                                            )}

                                        </div>

                                    </div>
                                    <button class="btn btn-outline-secondary" onClick={addProcut}>Create Product</button>
                                </div>
                            </div>
                        </div>
                        <div className=" col-xl-9 col-lg-8">
                            <div className="row">
                                <div class="card">
                                    <div class="card-header">
                                        <h2 class="card-title">Add Product Photo</h2>
                                    </div>
                                    <div class="card-body">
                                        <label for="add" className="upload form-control" >Upload</label>
                                        <input type="file" className=" invisible d-none" accept="image/*" id="add" onChange={(e) => { setDisplay(URL.createObjectURL(e.target.files[0])); setImage(e.target.files[0]) }} />
                                    </div>
                                </div>
                            </div>

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

            <div className={`position-fixed top-0 w-100 h-100 z-3 bg-light  bg-opacity-50 ${loadClass}`}>
                <div class="spinner-grow m-auto" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default AddProduct;