import React from 'react'
import axios from 'axios';

import classes from '../../css/admin_client_manager_page.module.css';

export default function Client({ client }) {

    const banUser = () => {
        axios.put(`https://sportbox.up.railway.app/api/person/ban?id=${client.id}`, {
            isBaned: true
        },
            {
                auth: {
                    username: process.env.REACT_APP_USERNAME,
                    password: process.env.REACT_APP_PASSWORD
                }
            }).then(res => {
                console.log(res.data);
                if (res.data.status === true) {
                    console.log(res.data);
                    alert(res.data.message)
                    //window.location.reload()
                } else {
                    alert(res.data.message)
                }
            }).catch(() => {
                alert("Произошла ошибка на сервере!")
            })
    }
    const unbanUser = () => {
        axios.put(`https://sportbox.up.railway.app/api/person/unban?id=${client.id}`, {
            isBaned: false
        },
            {
                auth: {
                    username: process.env.REACT_APP_USERNAME,
                    password: process.env.REACT_APP_PASSWORD
                }
            }).then(res => {
                if (res.data.status === true) {
                    console.log(res.data);
                    alert(res.data.message)
                    //window.location.reload()
                } else {
                    alert(res.data.message)
                }
            }).catch(() => {
                alert("Произошла ошибка на сервере!")
            })
    }
    const deleteUser = () => {
        axios.delete(`https://sportbox.up.railway.app/api/person/delete?id=${client.id}`,
            {
                auth: {
                    username: process.env.REACT_APP_USERNAME,
                    password: process.env.REACT_APP_PASSWORD
                }
            }).then(res => {
                if (res.data.status === true) {
                    console.log(res.data);
                    alert(res.data.message)
                    //window.location.reload()
                } else {
                    alert(res.data.message)
                }
            }).catch(() => {
                alert("Произошла ошибка на сервере!")
            })
    }

    const emailSpliter = (email) => {

        var list = email.split('@');
        email = list[0] + ' @' + list[1];

        return email;
    }

    return (
        <div className={classes.row}>

            <div className={classes.orderNumberRow}>
                {client.id}
            </div>

            <div className={classes.orderEquipmentRow}>
                <div className={classes.fullnameCell}>
                    {client.name}
                </div>
            </div>

            <div className={classes.orderPriceRow}>
                <div className={classes.emailCell}>
                    {emailSpliter(client.email)}
                </div>
            </div>

            <div className={classes.orderDataRow}>
                {client.isBaned ? <div>Заблокирован</div> : <div>Не заблокирован</div>}
            </div>
            <div className={classes.orderDataFromRow}>
                {client.role.name === "Customer" ? <div>Покупатель</div> : <div>Админ</div>}
            </div>
            <div className={classes.orderActionRow}>
                <div className={classes.buttonCancel}>
                    <button className={classes.cancelButton} type="submit" onClick={() => deleteUser()}>
                        <div className={classes.cancelButtonText}>
                            Удалить
                        </div>
                    </button>
                </div>
            </div>
            <div className={classes.orderActionRow}>
                {
                    client.isBaned ?
                        <div className={classes.buttonCancel}>
                            <button className={classes.cancelButton} type="submit" onClick={() => unbanUser()}>
                                <div className={classes.cancelButtonText}>
                                    Разблокировать
                                </div>
                            </button>
                        </div>
                        :
                        <div className={classes.buttonCancel}>
                            <button className={classes.cancelButton} type="submit" onClick={() => banUser()}>
                                <div className={classes.cancelButtonText}>
                                    Заблокировать
                                </div>
                            </button>
                        </div>
                }

            </div>

        </div>
    )
}
