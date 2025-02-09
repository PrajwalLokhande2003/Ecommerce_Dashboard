import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'


function Setting() {

    const theme = JSON.parse(sessionStorage.length)
    const [themes,setThemes] = useState(document.documentElement.getAttribute('data-bs-theme'))
    const [toper, setToper] = useState(document.documentElement.getAttribute('data-header-theme'))
    const [menu, setMenu] = useState(document.documentElement.getAttribute('data-nav-theme'))
    const [menusize, setMenuSize] = useState(document.documentElement.getAttribute('data-menu-size'))

    useEffect(() => {
        if (theme === 0) {
            sessionStorage.setItem('themes',
                JSON.stringify({ 'theme': 'dark' })
            )
            sessionStorage.setItem('toper',
                JSON.stringify({ 'color': 'dark' })
            )
            sessionStorage.setItem('menu',
                JSON.stringify({ 'color': 'dark' })
            )
            sessionStorage.setItem('menu-size',
                JSON.stringify({ 'size': 'sm-hover-active' })
            )
        }
        



    }, [theme])


    useEffect(()=>{
        document.documentElement.getAttribute('data-bs-theme') ==='light'?setThemes('light'):setThemes('dark')
        document.documentElement.getAttribute('data-header-theme') === 'light'?setToper('light'):setToper('dark')
        document.documentElement.getAttribute('data-nav-theme') === 'light' ? setMenu('light'): setMenu('dark')
        setMenuSize(document.documentElement.getAttribute('data-menu-size'))
    })
    





    function colorScheme(e) {

        e.target.value === 'light' ? document.documentElement.setAttribute("data-bs-theme", "light") : document.documentElement.setAttribute("data-bs-theme", "dark")

        sessionStorage.setItem('themes',
            JSON.stringify({ 'theme': e.target.value })
        )

    }

    function topBarColor(e) {

        e.target.value === 'light' ? document.documentElement.setAttribute("data-header-theme", "light") : document.documentElement.setAttribute("data-header-theme", "dark")

        sessionStorage.setItem('toper',
            JSON.stringify({ 'color': e.target.value })
        )


    }

    function menuColor(e) {

        e.target.value === 'light' ? document.documentElement.setAttribute("data-nav-theme", "light") : document.documentElement.setAttribute("data-nav-theme", "dark")

        sessionStorage.setItem('menu',
            JSON.stringify({ 'color': e.target.value })
        )


    }

    function menuSize(e) {

        document.documentElement.setAttribute("data-menu-size", e.target.value)

        sessionStorage.setItem('menu-size',
            JSON.stringify({ 'size': e.target.value })
        )


    }



    return (
        <>
            <div className={` setting overflow-scroll `}>
                <div className="">

                    <div className="top bg-primary p-4 bg-opacity-75 text-warning d-flex">
                        <div className=" d-flex align-items-center"><h2>Color Themes</h2></div>
                        <div className=" d-flex m-auto cursor-pointer">
                            <i className=" bi bi-x fs-1" onClick={() => { document.documentElement.removeAttribute("data-setting") }} ></i>
                        </div>
                    </div>

                    <div className="p-5 fs-3">

                        <div className="">
                            <h3 className="mb-2">Color Scheme</h3>
                            <div className=" form-check mb-2">
                                <input class="form-check-input" type="radio" name="data-bs-theme" id="layout-color-light" value="light" onClick={(e) => { colorScheme(e);setThemes(document.documentElement.getAttribute('data-bs-theme')) }} checked={themes === 'light'} />
                                <label class="form-check-label" for="layout-color-light">Light</label>
                            </div>
                            <div className="form-check mb-2 ">
                                <input class="form-check-input" type="radio" name="data-bs-theme" id="layout-color-dark" value="dark" onClick={(e) => { colorScheme(e); setThemes(document.documentElement.getAttribute('data-bs-theme')) }} checked={themes === 'dark'} />
                                <label class="form-check-label" for="layout-color-dark">Dark</label>
                            </div>
                        </div>
                        <div className="">
                            <h3 className="mb-2">Topbar Color</h3>
                            <div className=" form-check mb-2">
                                <input class="form-check-input" type="radio" name="data-bs-toper" id="toper-color-light" value="light" onClick={(e) => { topBarColor(e); setToper(document.documentElement.getAttribute('data-header-theme')) }} checked={toper === 'light'} />
                                <label class="form-check-label" for="toper-color-light">Light</label>
                            </div>
                            <div className=" form-check mb-2">
                                <input class="form-check-input" type="radio" name="data-bs-toper" id="toper-color-dark" value="dark" onClick={(e) => { topBarColor(e); setToper(document.documentElement.getAttribute('data-header-theme')) }} checked={toper === 'dark'} />
                                <label class="form-check-label" for="toper-color-dark">Dark</label>
                            </div>
                        </div>
                        <div className="">
                            <h3 className="mb-2">Menu Color</h3>
                            <div className=" form-check mb-2">
                                <input class="form-check-input" type="radio" name="data-bs-menu" id="menu-color-light" value="light" onClick={(e) => { menuColor(e); setMenu(document.documentElement.getAttribute('data-nav-theme')) }} checked={menu === 'light'} />
                                <label class="form-check-label" for="menu-color-light">Light</label>
                            </div>
                            <div className=" form-check mb-2">
                                <input class="form-check-input" type="radio" name="data-bs-menu" id="menu-color-dark" value="dark" onClick={(e) => { menuColor(e); setMenu(document.documentElement.getAttribute('data-nav-theme')) }} checked={menu === 'dark'} />
                                <label class="form-check-label" for="menu-color-dark">Dark</label>
                            </div>
                        </div>

                        <div className="">
                            <h3 className="mb-2">Sidebar Size</h3>
                            <div className=" form-check mb-2">
                                <input class="form-check-input" type="radio" name="data-bs-menu-size" id="layout-color-light" value="default" onClick={(e) => { menuSize(e); setMenuSize(document.documentElement.getAttribute('data-menu-size')) }} checked={menusize === 'default'} />
                                <label class="form-check-label" for="layout-color-light">Default</label>
                            </div>
                            <div className=" form-check mb-2">
                                <input class="form-check-input" type="radio" name="data-bs-menu-size" id="layout-color-dark" value="condensed" onClick={(e) => { menuSize(e); setMenuSize(document.documentElement.getAttribute('data-menu-size')) }} checked={menusize === 'condensed'} />
                                <label class="form-check-label" for="layout-color-dark">Condensed</label>
                            </div>
                            <div className=" form-check mb-2">
                                <input class="form-check-input" type="radio" name="data-bs-menu-size" id="layout-color-light" value="hidden" onClick={(e) => { menuSize(e); setMenuSize(document.documentElement.getAttribute('data-menu-size')) }} checked={menusize === 'hidden'} />
                                <label class="form-check-label" for="layout-color-light">Hidden</label>
                            </div>
                            <div className=" form-check mb-2">
                                <input class="form-check-input" type="radio" name="data-bs-menu-size" id="layout-color-dark" value="sm-hover-active" onClick={(e) => { menuSize(e); setMenuSize(document.documentElement.getAttribute('data-menu-size')) }} checked={menusize === 'sm-hover-active'} />
                                <label class="form-check-label" for="layout-color-dark">Small Hover Active </label>
                            </div>
                            <div className=" form-check mb-2">
                                <input class="form-check-input" type="radio" name="data-bs-menu-size" id="layout-color-dark" value="sm-over" onClick={(e) => { menuSize(e); setMenuSize(document.documentElement.getAttribute('data-menu-size')) }} checked={menusize === 'sm-over'} />
                                <label class="form-check-label" for="layout-color-dark">Small Hover </label>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting;