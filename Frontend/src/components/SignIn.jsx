import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = localStorage.getItem('user')

    const Navigate = useNavigate()

    const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'not found'


    async function signIn(e) {

        e.preventDefault()

        const formData = new FormData()
        formData.append('email',email)
        formData.append('password',password)


        await axios.post(`${BASE_URL}/signin`,formData,{
            headers:{'Content-Type':'application/json'}
        }).then((res) => {
            if (res) {
               localStorage.setItem('user',JSON.stringify(res.data[0])) 
               Navigate('/')
               window.location.reload()
            }
        }
        ).catch(err => console.log(err))
    }

    return (

        <>
        {!auth?<>
            <div className=" product main-sec m-auto">
                <div className=" container-fluid bg-transparent">
                    <div className="row">
                        <div className=" offset-lg-3 col-lg-6">
                            <div className="card">
                                <div className="card-body d-flex flex-column justify-content-center">
                                    <div className="mb-4">logo</div>
                                    <div className="fw-bold fs-2">Sign In</div>
                                    <div className=" text-muted mt-1 mb-4">Enter your email address and password to access admin panel.</div>
                                    <form>
                                        <label className=" form-label">Enter Email <span className=" text-danger">*</span></label>
                                        <input type="email" className=" form-control mb-4" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required />
                                        <label className=" form-label">Enter Password <span className=" text-danger">*</span></label>
                                        <input type="password" className="form-control mb-4" placeholder="********" value={password} onChange={e => setPassword(e.target.value)} required />
                                        <button type="submit" className="btn btn-primary mt-3 mb-3" onClick={ signIn}>SignIn</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>:''}
        </>
    )
}

export default SignIn;