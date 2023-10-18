import React, { useEffect } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


import classes from '../../css/admin_order_modify_page.module.css';

export default function AdminOrderChangePage() {

    useEffect(() => {
        document.title = "Change order"
     }, []);

    const order = useSelector(state => state.user.orderForChange);
    const now = new Date();
    const navigate = useNavigate()

    function checkData() {
        var now = new Date();
        if (order.startDate < now) {
            alert("Пока нельзя принять заказ")
            return false
        } else {
            return true
        }
    }

    const acceptOrder = () => {
        var check = checkData()
        if (check) {
            axios.put(`https://sportbox.up.railway.app/api/booking/return?id=${order.id}`, {},
                {
                    auth: {
                        username: process.env.REACT_APP_USERNAME,
                        password: process.env.REACT_APP_PASSWORD
                    }
                }).then(res => {
                    console.log(res.data);
                    alert(res.data.message)
                    navigate("/admin/orders")
                }).catch(() => {
                    alert("Произошла ошибка на сервере!")
                })
        }
    }

    return (
        <div className={classes.basePartRegistration}>

            <div className={classes.centreColumnRegistration}>

                <div className={classes.orderWrapper}>

                    <div className={classes.orderInformationLable}>
                        Информация о заказе:
                    </div>

                    <div className={classes.orderInformationWrapper}>
                        <div className={classes.rowInformation}>
                            <div className={classes.idLable}>
                                Id:
                            </div>
                            <div className={classes.id}>
                                {order.id}
                            </div>
                        </div>
                        <div className={classes.rowInformation}>
                            <div className={classes.idLable}>
                                Оборудование:
                            </div>

                            <div className={classes.equipment}>
                                {order.inventory}
                            </div>
                        </div>

                        <div className={classes.rowInformation}>
                            <div className={classes.idLable}>
                                Адрес эл. почты:
                            </div>
                            {order.email}
                        </div>

                        <div className={classes.rowInformation}>
                            <div className={classes.idLable}>
                                Дата начала:
                            </div>
                            {order.startDate}
                        </div>

                        <div className={classes.rowInformation}>
                            <div className={classes.idLable}>
                                Дата окончания:
                            </div>
                            {order.endDate}
                        </div>

                        <div className={classes.rowInformation}>
                            <div className={classes.idLable}>
                                Дата:
                            </div>
                            {order.date}
                        </div>

                        <div className={classes.rowInformation}>
                            <div className={classes.idLable}>
                                Долг:
                            </div>
                            {order.debt}
                        </div>
                    </div>

                    {
                        order.startDate < now ? false : <div className={classes.buttonFind}>
                            <button className={classes.findButton} type="button" onClick={() => acceptOrder()} >
                                Принять оборудование
                            </button>
                        </div>
                    }

                </div>


            </div>


        </div>
    )
}
