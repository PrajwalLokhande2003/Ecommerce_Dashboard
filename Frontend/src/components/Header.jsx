import React, { useEffect, useRef, useState } from "react";
import { Link, useFetchers } from "react-router-dom";
import Setting from "./Setting";
import axios from "axios";

function Header(props) {

    const [show, setShow] = useState('')
    const ariaExp = useRef(null)
    const [info, setInfo] = useState('')
    const [loadClass, setLoadClass] = useState('d-none')
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const user = JSON.parse(localStorage.getItem('user'))
    const id = JSON.parse(localStorage.getItem('user')).id

    const src = user.name==='Guest'?'':info.image

    const [theme, setTheme] = useState(sessionStorage.length > 0 ? JSON.parse(sessionStorage.getItem('themes')).theme : 'dark')




    useEffect(() => {
        setTheme(JSON.parse(sessionStorage.getItem('themes')).theme)
        document.documentElement.setAttribute("data-bs-theme", theme)
    }, [theme])

    function colorScheme(e) {

        e.target.value === 'light' ? document.documentElement.setAttribute("data-bs-theme", "light") : document.documentElement.setAttribute("data-bs-theme", "dark")
        setTheme(e.target.value)
        const data = { 'theme': e.target.value }
        sessionStorage.setItem('themes',
            JSON.stringify(data)
        )

    }
    useEffect(() => {
        getInfo()
    }, [])

    async function getInfo() {

        setLoadClass('d-flex')


        await axios.get(`${BASE_URL}/get-profile/${id}`).then(
            (res) => {
                if (res) {
                    setInfo(res.data[0])
                    setLoadClass('d-none')
                }
            }
        ).catch((err) => {
            if (err) {
                setLoadClass('d-none')
            }
        })

    }

    function logOut(){
        localStorage.clear()
        window.location.reload()
    }


    function menu() {
        document.documentElement.setAttribute("data-menu-size", "show")
        const backdrop = document.createElement('div')
        backdrop.classList = 'backdrop'
        document.body.appendChild(backdrop)

        const self = this
        backdrop.addEventListener('click', () => {
            document.body.removeChild(backdrop)
            document.documentElement.setAttribute("data-menu-size", "")

        })
    }

    useEffect(() => {
        handelAria()
    })

    function handelAria() {
        if ((show === '' && ariaExp.current?.getAttribute('aria-expanded') !== 'true')) {
            ariaExp.current?.addEventListener('click', function () {
                setShow('show')
                ariaExp.current?.setAttribute('aria-expanded', 'true')
            })
        } else {
            setTimeout(() => {
                document.addEventListener('click', function () {
                    return ariaExp.current?.getAttribute('aria-expanded') !== 'false' && show === 'show' ? (setShow(''), ariaExp.current?.setAttribute('aria-expanded', 'false')) : ''

                }, 1000);
            })
        }
    }




    return (
        <>
            <div className="main-sec position-sticky p-0 header">
                <div className=" container-fluid p-4 ">
                    <div className=" d-flex justify-content-between ">
                        <div className=" d-flex align-items-center gap-4 ">
                            <svg className="burger" xmlns="http://www.w3.org/2000/svg" width={21} height={15} viewBox="0 0 21 15" onClick={menu}>
                                <rect height="2" width="20" y="0" rx="1" ry="1" className="line"></rect>
                                <rect height="2" width="20" y="5" rx="1" ry="1" className="line"></rect>
                                <rect height="2" width="20" y="10" rx="1" ry="1" className="line"></rect>
                            </svg>
                            <div className="fs-3 wspace-nowrap w-auto ">{props.title}</div>
                        </div>


                        <div className="d-flex gap-3 ">
                            <div className="">
                                <button class={`bi bi-moon bg-transparent border-none `} value={'dark'} onClick={(e) => { colorScheme(e) }}></button>
                                <button class={`bi bi-sun bg-transparent border-none `} value={'light'} onClick={(e) => { colorScheme(e) }}></button>
                            </div>
                            <div className="hide">
                                <button class="bi bi-bell-fill bg-transparent border-none"></button>
                            </div>
                            <div className="">
                                <button class="bi bi-gear-fill bg-transparent border-none" onClick={() => { document.documentElement.setAttribute("data-setting", "active") }}></button>
                            </div>

                            <div className="hide">
                                <button class="bi bi-clock-fill bg-transparent border-none"></button>
                            </div>

                            <div className="">
                                <button className={` bg-transparent ${show}`} ref={ariaExp}>
                                    <span>
                                        {src !== '' ? <img src={src} alt="..." className=" avatar-sm mx-0 m-auto rounded-circle" style={{ scale: 1.2 }} /> : <i class="bi bi-person-circle"></i>}

                                    </span>
                                </button>
                            </div>

                            <div>




                                <div className={`card user position-absolute top-100 end-0 px-2 fs-3 ${show} `} style={show === 'show' ? { background: 'var(--bs-main-nav-bg)', display: 'block' } : {}}>
                                    <div className="card-header">Welcome {user.name}</div>
                                    <div className="card-body d-grid justify-content-center cursor-pointer">
                                        <div className="mb-2"><Link to={'/profile'}><i class="bi bi-person-circle"></i> Profile</Link></div>
                                        <div className="mb-2"><i class="bi bi-question-circle"></i> Help</div>

                                    </div>
                                    <div className=" card-footer d-flex justify-content-center text-danger cursor-pointer" onClick={logOut}><i class="bi bi-box-arrow-left px-2"></i>Logout</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Setting />

            <div className={`position-fixed top-0 w-100 h-100 z-3 bg-light  bg-opacity-50 ${loadClass}`}>
                <div class="spinner-grow m-auto" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

        </>


    )
}

export default Header;