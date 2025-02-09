import React, { useState } from "react";
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'

function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loadClass, setLoadClass] = useState('d-none')

    const auth = localStorage.getItem('user')

    const Navigate = useNavigate()

    const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'not found'


    async function signIn(e) {

        e.preventDefault()

        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)


        await axios.post(`${BASE_URL}/signin`, formData, {
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            if (res) {
                localStorage.setItem('user', JSON.stringify(res.data[0]))
                Navigate('/')
                window.location.reload()
            }
        }
        ).catch(err => console.log(err))
    }

    function guestIn() {

        setLoadClass('d-flex')

        setTimeout(() => {
            const user = { 'name': 'Guest', 'email': 'guest@test.com', 'id': '12' }
            localStorage.setItem('user', JSON.stringify(user))
            Navigate('/')
            window.location.reload()
            setLoadClass('d-none')
        }, 15000);
    }

    return (

        <>
            {!auth ? <>
                <div className=" product main-sec d-flex position-absolute w-100 h-100 align-items-center m-auto">
                    <div className=" container-fluid w-100 bg-transparent">
                        <div className="row">
                            <div className=" offset-lg-3 col-lg-6">
                                <div className="card">
                                    <div className="card-body d-flex flex-column justify-content-center">
                                        <div className="mb-4"><i className=" bi bi-cart-fill text-danger"></i><span className="logo px-2 text-warning fw-bolder">Wish Mart</span></div>
                                        <div className="fw-bold fs-2">Sign In</div>
                                        <div className=" text-muted mt-1 mb-4">Enter your email address and password to access admin panel.</div>
                                        <form>
                                            <label className=" form-label">Enter Email <span className=" text-danger">*</span></label>
                                            <input type="email" className=" form-control mb-4" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required />
                                            <label className=" form-label">Enter Password <span className=" text-danger">*</span></label>
                                            <input type="password" className="form-control mb-4" placeholder="********" value={password} onChange={e => setPassword(e.target.value)} required />
                                            <div className=" d-flex justify-content-evenly align-items-center mb-3">
                                                <button type="submit" className="btn btn-outline-primary mt-3 mb-3 w-50" onClick={signIn}>SignIn</button>
                                                <span className=" px-4 fs-4">OR</span>
                                                <button type="submit" className="btn btn-outline-warning mt-3 mb-3 w-50" onClick={guestIn}>Guest</button>
                                            </div>
                                        </form>
                                        <div className="mb-3">
                                            <div className=" text-center">
                                                <span className="fs-4 text-danger">Don't have an account? </span>
                                                <Link to={'/signup'} className="  hover-main-color">SignUp</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </> : ''}


            <div className={`position-fixed top-0 w-100 h-100 z-3 bg-light  bg-opacity-50 ${loadClass}`}>
                <div class="spinner-grow m-auto" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>


        </>
    )
}

export default SignIn;