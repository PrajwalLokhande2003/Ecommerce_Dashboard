import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function Profile() {

    const title = 'Create product'

    const [display, setDisplay] = useState('')
    const [image, setImage] = useState('')
    const [Name, setName] = useState('')
    const [Title, setTitle] = useState('')
    const [Address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [Number, setNumber] = useState('')
    const [loadClass, setLoadClass] = useState('d-none')

    const BASE_URL = process.env.REACT_APP_BASE_URL
    const creatorId = JSON.parse(localStorage.getItem('user')).id

    const navigate = useNavigate()



    async function addProfile() {

        setLoadClass('d-flex')


        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', Name)
        formData.append('title', Title)
        formData.append('info', description)
        formData.append('mobile', Number)
        formData.append('address', Address)
        formData.append('u_id', creatorId)

        await axios.post(`${BASE_URL}/create-profile`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(
            (res) => {
                if (res) {
                    setLoadClass('d-none')
                    navigate('/')
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
                <div className=" container-fluid">
                    <div className="row">
                        <div className=" col-xl-3 col-lg-4">
                            <div class="card">
                                <img src={display} class="card-img-top p-4 rounded-circle" alt="..." />
                                <div class="card-body p-4">
                                    <div className=" card-header">
                                        <h1 class="card-title ">{Name} <span className="fs-4"> {Title!==''?`(${Title})`:''}</span></h1>
                                    </div>
                                    <div className=" card-body">
                                        <div>
                                            Address: {Address}
                                        </div>
                                        <div>
                                            Mobile: {Number}
                                        </div>
                                    </div>
                                    
                                    
                                    <button class="btn btn-outline-secondary" onClick={addProfile}>Add Profile</button>
                                </div>
                            </div>
                        </div>
                        <div className=" col-xl-9 col-lg-8">
                            <div className="row">
                                <div class="card">
                                    <div class="card-header">
                                        <h2 class="card-title">Add Profile Picture</h2>
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
                                        <h2 class="card-title">Personel Information</h2>
                                    </div>
                                    <div class="card-body">
                                        <div className="row">
                                            <div className=" col-md-6 d-grid my-4">
                                                <label className=" form-label">Enter Name</label>
                                                <input placeholder="Enter Name" className=" form-control" value={Name} onChange={e => setName(e.target.value)} />
                                            </div>
                                            <div className=" col-md-6 d-grid my-4">
                                                <label className=" form-label">Select Title</label>
                                                <select class="form-select" aria-label="Default select example" value={Title} onChange={e => setTitle(e.target.value)}>
                                                    <option selected>Choose a Title</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Seller">Seller</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className=" col-md-6 d-grid my-4">
                                                <label className=" form-label">Enter Address</label>
                                                <input placeholder="Enter address" className=" form-control" value={Address} onChange={e => setAddress(e.target.value)} />
                                        </div>
                                        <div className=" col-md-6 d-grid my-4">
                                                <label className=" form-label">Mobile Number</label>
                                                <input type="number" min={10} max={10} placeholder="0000000000"  className=" form-control" value={Number} onChange={e => setNumber(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <label className=" form-label"> Short Information About You</label>
                                            <textarea placeholder="Short Information" className=" form-control" rows={6} value={description} onChange={e => setDescription(e.target.value)}></textarea>
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

export default Profile;