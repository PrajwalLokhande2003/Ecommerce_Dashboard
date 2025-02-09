import React, { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loadClass, setLoadClass] = useState('d-none')

    const auth = localStorage.getItem('user')

    const BASE_URL = process.env.REACT_APP_BASE_URL

    const Navigate = useNavigate()

    async function signUp(e) {

        setLoadClass('d-flex')
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        await axios.post(`${BASE_URL}/signup`, formData, {
            headers: { 'Content-Type': 'application/json' }
        }).then(
            (res) => {
                if (res.data) {

                    alert('ypu successfully added...')
                    setLoadClass('d-none')
                    Navigate('/signin')

                }
            }).catch((err) => {
                setLoadClass('d-none')
            })
    }


    return (
        <>
            {auth ? '' : <>
                <div className=" product main-sec d-flex position-absolute w-100 h-100 align-items-center m-auto py-5">
                    <div className=" container-fluid w-100 bg-transparent">
                        <div className="row">
                            <div className=" offset-lg-3 col-lg-6">
                                <div className="card">
                                    <div className="card-body d-flex flex-column justify-content-center fs-3">
                                        <div className="mb-4"><i className=" bi bi-cart-fill text-danger"></i><span className="logo px-2 text-warning fw-bolder">Wish Mart</span></div>
                                        <div className="fw-bold fs-1">Sign Up</div>
                                        <div className=" text-muted mt-1 mb-4">New to our platform? Sign up now! It only takes a minute</div>
                                        <form>
                                            <label className=" form-label">Enter Name <span className=" text-danger">*</span></label>
                                            <input type="text" className=" form-control mb-4" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} required />
                                            <label className=" form-label">Enter Email <span className=" text-danger">*</span></label>
                                            <input type="email" className=" form-control mb-4" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required />
                                            <label className=" form-label">Enter Password <span className=" text-danger">*</span></label>
                                            <input type="password" className="form-control mb-4" placeholder="********" value={password} onChange={e => setPassword(e.target.value)} required />
                                            <div className=" d-flex justify-content-evenly align-items-center mb-3">
                                                <button className="btn btn-outline-primary mt-3 mb-3 w-50" onClick={signUp}>SignUp</button>
                                            </div>
                                        </form>
                                        <div className="mb-3">
                                            <div className=" text-center">
                                                <span className="fs-4 text-danger">I already have an account </span>
                                                <Link to={'/signin'} className="  hover-main-color px-2"> SignIn</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>}


            <div className={`position-fixed top-0 w-100 h-100 z-3 bg-light  bg-opacity-50 ${loadClass}`}>
                <div class="spinner-grow m-auto" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>


        </>
    )
}

export default SignUp;