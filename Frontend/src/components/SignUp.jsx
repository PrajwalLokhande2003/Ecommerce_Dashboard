import React, { useState } from "react";
import axios from 'axios'

function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = localStorage.getItem('user')

    const BASE_URL = process.env.REACT_APP_BASE_URL

    async function signUp(e) {

        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        await axios.post(`${BASE_URL}/signup`, formData,{
            headers:{'Content-Type':'application/json'}
        }).then(
            alert('added')
        )
    }


    return (
        <>
        {auth?'':<>
            <div className=" product main-sec py-5">
                <div className=" container-fluid bg-transparent">
                    <div className="row">
                        <div className=" offset-lg-3 col-lg-6">
                            <div className="card">
                                <div className="card-body d-flex flex-column justify-content-center fs-3">
                                    <div className="mb-4">logo</div>
                                    <div className="fw-bold fs-1">Sign Up</div>
                                    <div className=" text-muted mt-1 mb-4">New to our platform? Sign up now! It only takes a minute</div>
                                    <form>
                                        <label className=" form-label">Enter Name <span className=" text-danger">*</span></label>
                                        <input type="text" className=" form-control mb-4" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} required/>
                                        <label className=" form-label">Enter Email <span className=" text-danger">*</span></label>
                                        <input type="email" className=" form-control mb-4" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                                        <label className=" form-label">Enter Password <span className=" text-danger">*</span></label>
                                        <input type="password" className="form-control mb-4" placeholder="********" value={password} onChange={e => setPassword(e.target.value)} required/>
                                        <button className="btn btn-primary mt-3 mb-3" onClick={signUp}>SignUp</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>}
        </>
    )
}

export default SignUp;