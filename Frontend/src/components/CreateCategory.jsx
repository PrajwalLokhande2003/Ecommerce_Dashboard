import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";

function CreateCategory() {
    const [display, setDisplay] = useState('')
    const [image, setImage] = useState('')
    const [Title, setTitle] = useState('')
    const [Stock, setStock] = useState('')
    const [Create, setCreate] = useState('')
    const [Id, setId] = useState('')
    const [startingPrice, setStartingPrice] = useState('')
    const [loadClass, setLoadClass] = useState('d-none')

    const title = 'Create product'

    const BASE_URL = process.env.REACT_APP_BASE_URL
    const creatorId = JSON.parse(localStorage.getItem('user')).id

    async function addCategorie() {

        setLoadClass('d-flex')


        const formData = new FormData()
        formData.append('image', image)
        formData.append('creator_name', Create)
        formData.append('title', Title)
        formData.append('tag_id', Id)
        formData.append('stock', Stock)
        formData.append('creator_id', creatorId)
        formData.append('price', startingPrice)

        await axios.post(`${BASE_URL}/create-categorie`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(
            (res) => {
                if (res) {
                    setLoadClass('d-none')
                    alert('created')
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
            <div className=" main-sec">
                <div className=" container-fluid">
                    <div className="row">
                        <div className=" col-xl-3 col-lg-4">
                            <div class="card">

                                <div class="card-body p-4">
                                    <div className="rounded bg-light d-flex align-items-center justify-content-center mx-auto">
                                        <img src={display} class="card-img-top img-fluid avatar-xxl" alt="..." />
                                    </div>
                                    <div className=" card-header">
                                        <h1 class="card-title ">{Title}</h1>
                                    </div>
                                    <div className=" d-flex gap-3 align-items-center">
                                        <span>Created By  : {Create}</span>
                                    </div>
                                    <div className="d-flex gap-3 align-items-center">Stock : {'$'+startingPrice}</div>
                                    <div className="d-flex gap-3 align-items-center">Stock : {Stock}</div>
                                    <div className="d-flex gap-3 align-items-center">Id : {Id ? '#' + Id : ''}</div>

                                    <div className="row g-4 py-3 ">
                                        <button class="btn btn-outline-secondary" onClick={addCategorie}>Create Product</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-xl-9 col-lg-8">
                            <div className="row">
                                <div class="card">
                                    <div class="card-header">
                                        <h2 class="card-title">Add Thumbnail Photo</h2>
                                    </div>
                                    <div class="card-body">
                                        <label for="add" className="upload form-control" >Upload</label>
                                        <input type="file" className=" invisible d-none" id="add" onChange={(e) => { setDisplay(URL.createObjectURL(e.target.files[0])); setImage(e.target.files[0]) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div class="card">
                                    <div class="card-header">
                                        <h2 class="card-title">General Information</h2>
                                    </div>
                                    <div class="card-body">
                                        <div className="row">
                                            <div className=" col-md-6 d-grid my-4">
                                                <label className=" form-label">Category Title</label>
                                                <input placeholder="Categorie Title" className=" form-control" value={Title} onChange={e => setTitle(e.target.value)} />
                                            </div>
                                            <div className=" col-md-6 d-grid my-4">
                                                <label className=" form-label">Created By</label>
                                                <select class="form-select" aria-label="Default select example" onChange={e => setCreate(e.target.value)}>
                                                    <option selected>Choose Create</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Seller">Seller</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4 my-4">
                                                <label className=" form-label">Staring Price</label>
                                                <input type="text" className=" form-control" placeholder="000 to 0000" value={startingPrice} onChange={e => setStartingPrice(e.target.value)} />
                                            </div>
                                            <div className="col-md-4 my-4">
                                                <label className=" form-label">Stock</label>
                                                <input type="number" className=" form-control" placeholder="Quantity" onChange={e => setStock(e.target.value)} />
                                            </div>
                                            <div className="col-md-4 my-4">
                                                <label className="form-label">Tag ID</label>
                                                <input type="number" className=" form-control" placeholder="#****" onChange={e => setId(e.target.value)} />
                                            </div>
                                        </div>



                                        <div className="row">
                                            <label className=" form-label"> Description</label>
                                            <textarea placeholder="Short description abiut product" className=" form-control" rows={6}></textarea>
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

export default CreateCategory;