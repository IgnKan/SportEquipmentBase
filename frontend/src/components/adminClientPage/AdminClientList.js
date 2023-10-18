import React from 'react'
import Client from './Client'
import { useNavigate } from "react-router-dom"

import classes from '../../css/admin_client_manager_page.module.css';

export default function AdminClientList({ clients }) {

    const navigate = useNavigate()
    const linkToAddPage = () => {
        navigate("/admin/clients/add")
    }

    return (
        <div className={classes.tableManagerWrapper}>

            <div className={classes.buttonAdd}>
                <button className={classes.addButton} type="submit" onClick={() => linkToAddPage()}>
                    Добавить клиента
                </button>
            </div>

            <div className={classes.tableWrapper}>
                <div className={classes.columnLables}>
                    <div className={classes.orderNumberLable}>
                        Id
                    </div>
                    <div className={classes.orderEquipmentLable}>
                        ФИО
                    </div>
                    <div className={classes.orderPriceLable}>
                        Email
                    </div>
                    <div className={classes.orderDataLable}>
                        Статус
                    </div>
                    <div className={classes.orderDataFromLable}>
                        Роль
                    </div>
                    <div className={classes.orderActionLable}>

                    </div>
                    <div className={classes.orderActionLable}>

                    </div>
                </div>

                <div className={classes.tableRows}>
                    {
                        clients.map(client => {
                            console.log(clients.length);
                            if (clients[0] === null) {
                                return false
                            } else {
                                return <Client key={client.id} client={client}></Client>
                            }
                        })
                    }
                </div>

            </div>
        </div>
    )
}
