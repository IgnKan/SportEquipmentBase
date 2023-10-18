import React from 'react'

import {useDispatch} from "react-redux"
import {setOrderForChange} from "../../store/userSlice"
import { useNavigate } from "react-router-dom"

import classes from '../../css/admin_order_manager_page.module.css';

export default function Order({ order }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const linkToChangePage = () => {
        dispatch(setOrderForChange(order))
        navigate("/admin/orders/change")
    }

    const emailSpliter= (email) =>{
        
        var list = email.split('@');
        email = list[0] + ' @' + list[1];

        return email;
    }

    return (
        <div className={classes.row}>

            <div className={""}>
                {order.id}
            </div>


                <div className={classes.fullnameCell}>
                    {order.inventory}
                </div>
            
            <div className={classes.eventEquipmentTypeRow}>
                <div className={classes.eventEquipmentTypeCell}>
                    {emailSpliter(order.email)}
                </div>
            </div>

            <div className={classes.eventPriceRow}>
                {order.price}
            </div>
            <div className={classes.eventDataFromRow}>
                {order.date}
            </div>
            <div className={classes.eventDataToRow}>
                {order.startDate}
            </div>
            <div className={classes.eventDataToRow}>
                {order.endDate}
            </div>
            <div className={classes.orderDebt}>
                {order.debt}
            </div>
            <div className={classes.orderActionRow}>
                <div className={classes.buttonCancel}>
                    <button className={classes.cancelButton} type="button" onClick={() => linkToChangePage()}>
                        <div className={classes.cancelButtonText}>
                            Изменить
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
