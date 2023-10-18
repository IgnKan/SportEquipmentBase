import React, { useState, useEffect } from 'react'
import AdminOrderFilterField from "./AdminOrderFilterField"
import AdminOrderList from "./AdminOrderList"

import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

import classes from '../../css/admin_order_manager_page.module.css';

export default function AdminOrderManagerPage() {

    const [orders, setOrders] = useState([])
    const [currentOrders, setCurrentOrders] = useState(orders)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        document.title = "Manager orders"

        setLoading(true)
        axios.post("https://sportbox.up.railway.app/api/booking/filter", {},
            {
                auth: {
                    username: process.env.REACT_APP_USERNAME,
                    password: process.env.REACT_APP_PASSWORD
                }
            }).then(res => {
                console.log(res.data);
                setOrders(res.data)
                setCurrentOrders(res.data)
                setLoading(false)
            }).catch(() => {
                alert("Произошла ошибка на сервере!")
            })
    }, [])

    const changeFilter = (orders) => {
        setCurrentOrders(orders)
    }

    return (
        loading ?
                    <ClipLoader
                        color={"#1C62CD"}
                        loading={loading}
                        size={200}
                        className="spin"
                    />
                    :
        <div className={classes.managerWrapper}>
            {
                    <>
                        <AdminOrderFilterField changeFilter={changeFilter} ></AdminOrderFilterField>
                        <AdminOrderList orders={currentOrders}></AdminOrderList>
                    </>
            }
        </div>
    )
}
