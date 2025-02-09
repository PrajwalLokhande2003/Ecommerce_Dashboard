import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function Creator() {

    const title = 'Creator'

    const [Name, setName] = useState('')
    const [Id, setId] = useState('')
    const [Item, setItem] = useState('')
    const [PurchaseStatus, setPurchaseStatus] = useState('')
    const [Date, setDate] = useState('')
    const [Total, setTotal] = useState('')
    const [PaymentMethod, setPaymentMethod] = useState('')
    const [PaymentStatus, setPaymentStatus] = useState('')

    const [WarehouseName, setWarehouseName] = useState('')
    const [Location, setLocation] = useState('')
    const [Manager, setManager] = useState('')
    const [ContactNumber, setContactNumber] = useState('')
    const [StockAvailable, setStockAvailable] = useState('')
    const [StockShipping, setStockShipping] = useState('')
    const [WarehouseRevenue, setWarehouseRevenue] = useState('')

    const [CName, setCName] = useState('')
    const [orderId, setOrderId] = useState('')
    const [roItem, setROItem] = useState('')
    const [roContactNumber, setROContactNumber] = useState('')
    const [Amount, setAmount] = useState('')
    const [roReceivedStatus, setROReceivedStatus] = useState('')
    const [roPaymentStatus, setROPaymentStatus] = useState('')

    const [tlClass, setTLClass] = useState('d-flex')
    const [whClass, setWHClass] = useState('d-none')
    const [roClass, setROClass] = useState('d-none')
    const [plClass, setPLClass] = useState('d-none')

    const [loadClass, setLoadClass] = useState('d-none')

    const BASE_URL = process.env.REACT_APP_BASE_URL

    const param = useParams()
    const navigate = useNavigate()

    async function Transection() {


        setLoadClass('d-flex')

        const formData = new FormData()
        formData.append('order_by', Name)
        formData.append('tid', Id)
        formData.append('item', Item)
        formData.append('purchase_status', PurchaseStatus)
        formData.append('date', Date)
        formData.append('total', Total)
        formData.append('payment_method', PaymentMethod)
        formData.append('payment_tatus', PaymentStatus)

        console.log(formData);


        await axios.post(`${BASE_URL}/transection`, formData, {
            headers: { 'Content-Type': 'application/json' }
        }).then(
            (res) => {
                if (res) {
                    setLoadClass('d-none')
                    navigate('/order-trans')
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

    async function Warehouse() {


        setLoadClass('d-flex')

        const formData = new FormData()
        formData.append('warehouse_name', WarehouseName)
        formData.append('location', Location)
        formData.append('manager', Manager)
        formData.append('contact_number', ContactNumber)
        formData.append('stock_available', StockAvailable)
        formData.append('stock_shipping', StockShipping)
        formData.append('warehouse_revenue', WarehouseRevenue)

        console.log(formData);


        await axios.post(`${BASE_URL}/warehouse`, formData, {
            headers: { 'Content-Type': 'application/json' }
        }).then(
            (res) => {
                if (res) {
                    setLoadClass('d-none')
                    navigate('/wearhouse')
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

    async function receivedOrder() {


        setLoadClass('d-flex')

        const formData = new FormData()
        formData.append('order_id', orderId)
        formData.append('customer', CName)
        formData.append('item', roItem)
        formData.append('amount', Amount)
        formData.append('contact_number', roContactNumber)
        formData.append('received_status', roReceivedStatus)
        formData.append('payment_status', roPaymentStatus)

        console.log(formData);


        await axios.post(`${BASE_URL}/received-order`, formData, {
            headers: { 'Content-Type': 'application/json' }
        }).then(
            (res) => {
                if (res) {
                    setLoadClass('d-none')
                    navigate('/received-order')
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

    function handelTLRadio(e) {
        if (e.target.value === 'Transection List') {
            setTLClass('d-flex');
            setWHClass('d-none');
            setPLClass('d-none')
            setROClass('d-none')
        }
    }
    function handelWHRadio(e) {
        if (e.target.value === 'Warehouse') {
            setWHClass('d-flex');
            setTLClass('d-none');
            setPLClass('d-none')
            setROClass('d-none')
        }
    }
    function handelPLRadio(e) {
        if (e.target.value === 'Purchase List') {
            setTLClass('d-none');
            setWHClass('d-none');
            setPLClass('d-flex')
            setROClass('d-none')
        }
    }
    function handelRORadio(e) {
        if (e.target.value === 'Received Order') {
            setWHClass('d-none');
            setTLClass('d-none');
            setPLClass('d-none')
            setROClass('d-flex')
        }
    }





    return (
        <>
            <Header title={title} />

            <div className=" product main-sec">
                <div className=" container-fluid">

                    <div className="row">
                        <div className="card">
                            <div className=" card-body d-flex gap-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flex" id="flexRadioDefault1" value='Transection List' onChange={(e) => handelTLRadio(e)} />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Transection List
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flex" id="flexRadioDefault2" value='Warehouse' onChange={(e) => handelWHRadio(e)} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Warehouse
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flex" id="flexRadioDefault1" value='Received Order' onChange={(e) => handelRORadio(e)} />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Received Order
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flex" id="flexRadioDefault2" value='Purchase List' onChange={(e) => handelPLRadio(e)} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Purchase List
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className={`row ${tlClass}`}>
                            <div class="card">
                                <div class="card-header">
                                    <h2 class="card-title">Transection List</h2>
                                </div>
                                <div class="card-body">
                                    <div className="row">
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Id</label>
                                            <input type="number" placeholder="Id" className=" form-control" value={Id} onChange={e => setId(e.target.value)} />
                                        </div>

                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Order By</label>
                                            <input placeholder="Costumer Name" className=" form-control" value={Name} onChange={e => setName(e.target.value)} />
                                        </div>
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Item</label>
                                            <input placeholder="Item Name" className=" form-control" value={Item} onChange={e => setItem(e.target.value)} />

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Purchase Status</label>
                                            <select class="form-select" aria-label="Default select example" onChange={e => setPurchaseStatus(e.target.value)}>
                                                <option value="item received" selected>Purchase Status</option>
                                                <option value="item received">item received</option>
                                                <option value="pending">pending</option>
                                                <option value="cancel">cancel</option>
                                            </select>
                                        </div>

                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Date</label>
                                            <input type="date" placeholder="DD-MM-YY" className=" form-control" value={Date} onChange={e => setDate(e.target.value)} />
                                        </div>
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Total</label>
                                            <input type="number" placeholder="Total" className=" form-control" value={Total} onChange={e => setTotal(e.target.value)} />

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Payment Method</label>
                                            <select class="form-select" aria-label="Default select example" onChange={e => setPaymentMethod(e.target.value)}>
                                                <option value="online" selected>Payment Method</option>
                                                <option value="online">online</option>
                                                <option value="offline">offline</option>
                                                <option value="other">other</option>
                                            </select>
                                        </div>

                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Payment Status</label>
                                            <select class="form-select" aria-label="Default select example" onChange={e => setPaymentStatus(e.target.value)}>
                                                <option value="pending" selected>Payment Status</option>
                                                <option value="complete">complete</option>
                                                <option value="pending">pending</option>
                                                <option value="cancel">cancel</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button className="btn btn-danger" onClick={Transection}>Create Transection</button>

                                </div>
                            </div>

                        </div>

                        <div className={`row ${whClass}`}>
                            <div className="card">
                                <div class="card-header">
                                    <h2 class="card-title">Warehouse List</h2>
                                </div>
                                <div class="card-body">
                                    <div className="row">
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Warehouse Name</label>
                                            <input placeholder="Warehouse Name" className=" form-control" value={WarehouseName} onChange={e => setWarehouseName(e.target.value)} />
                                        </div>
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Location</label>
                                            <input placeholder="Enter Location" className=" form-control" value={Location} onChange={e => setLocation(e.target.value)} />

                                        </div>
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Manager</label>
                                            <input placeholder="Manager Name" className=" form-control" value={Manager} onChange={e => setManager(e.target.value)} />

                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Contact Number</label>
                                            <input type="number" placeholder="0000000000" className=" form-control" value={ContactNumber} onChange={e => setContactNumber(e.target.value)} />

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Stock Available</label>
                                            <input type="number" placeholder="0000" className=" form-control" value={StockAvailable} onChange={e => setStockAvailable(e.target.value)} />
                                        </div>

                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Stock Shipping</label>
                                            <input type="number" placeholder="0000" className=" form-control" value={StockShipping} onChange={e => setStockShipping(e.target.value)} />
                                        </div>
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Warehouse Revenue</label>
                                            <input type="number" placeholder="0000" className=" form-control" value={WarehouseRevenue} onChange={e => setWarehouseRevenue(e.target.value)} />
                                        </div>

                                    </div>

                                    <button className="btn btn-danger" onClick={Warehouse}>Create Warehouse</button>

                                </div>
                            </div>
                        </div>


                        <div className={`row ${roClass}`}>
                            <div class="card">
                                <div class="card-header">
                                    <h2 class="card-title">Received Order</h2>
                                </div>
                                <div class="card-body">
                                    <div className="row">
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">ID</label>
                                            <input type="number" placeholder="Id" className=" form-control" value={orderId} onChange={e => setOrderId(e.target.value)} />
                                        </div>

                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Customer</label>
                                            <input placeholder="Costumer Name" className=" form-control" value={CName} onChange={e => setCName(e.target.value)} />
                                        </div>
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Item</label>
                                            <input placeholder="Item Name" className=" form-control" value={roItem} onChange={e => setROItem(e.target.value)} />

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Amount </label>
                                            <input type="number" placeholder="0000" className=" form-control" value={Amount} onChange={e => setAmount(e.target.value)} />
                                        </div>

                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Contact Number</label>
                                            <input type="number" placeholder="0000000000" className=" form-control" value={roContactNumber} onChange={e => setROContactNumber(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Received Status</label>
                                            <select class="form-select" aria-label="Default select example" onChange={e => setROReceivedStatus(e.target.value)}>
                                                <option  selected>Received Status</option>
                                                <option value="Item received">Item received</option>
                                                <option value="pending">pending</option>
                                                <option value="cancel">cancel</option>
                                            </select>
                                        </div>

                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Payment Status</label>
                                            <select class="form-select" aria-label="Default select example" onChange={e => setROPaymentStatus(e.target.value)}>
                                                <option value="pending" selected>Payment Status</option>
                                                <option value="complete">complete</option>
                                                <option value="pending">pending</option>
                                                <option value="cancel">cancel</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button className="btn btn-danger" onClick={receivedOrder}>Create Transection</button>

                                </div>
                            </div>

                        </div>

                        <div className={`row ${plClass}`}>
                            <div className="card">
                                <div class="card-header">
                                    <h2 class="card-title">Purchase List</h2>
                                </div>
                                <div class="card-body">
                                    <div className="row">
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Warehouse Name</label>
                                            <input placeholder="Warehouse Name" className=" form-control" value={WarehouseName} onChange={e => setWarehouseName(e.target.value)} />
                                        </div>
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Location</label>
                                            <input placeholder="Enter Location" className=" form-control" value={Location} onChange={e => setLocation(e.target.value)} />

                                        </div>
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Manager</label>
                                            <input placeholder="Manager Name" className=" form-control" value={Manager} onChange={e => setManager(e.target.value)} />

                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Contact Number</label>
                                            <input type="number" placeholder="0000000000" className=" form-control" value={ContactNumber} onChange={e => setContactNumber(e.target.value)} />

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Stock Available</label>
                                            <input type="number" placeholder="0000" className=" form-control" value={StockAvailable} onChange={e => setStockAvailable(e.target.value)} />
                                        </div>

                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Stock Shipping</label>
                                            <input type="number" placeholder="0000" className=" form-control" value={StockShipping} onChange={e => setStockShipping(e.target.value)} />
                                        </div>
                                        <div className=" col-md-3 d-grid my-4">
                                            <label className=" form-label">Warehouse Revenue</label>
                                            <input type="number" placeholder="0000" className=" form-control" value={WarehouseRevenue} onChange={e => setWarehouseRevenue(e.target.value)} />
                                        </div>

                                    </div>

                                    <button className="btn btn-danger" onClick={Warehouse}>Create Warehouse</button>

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

export default Creator;