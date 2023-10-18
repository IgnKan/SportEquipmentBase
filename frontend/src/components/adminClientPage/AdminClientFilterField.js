import React, { useState } from 'react'
import axios from 'axios';
import validator from 'validator';

import classes from '../../css/admin_client_manager_page.module.css';

export default function AdminClientFilterField({ changeFilter }) {

    const [filter, setFilter] = useState({})

    const filtredInput = (event) => {
        if (event.target.value === "") {
            setFilter({})
        } else {
            setFilter(() => {
                return {
                    email: event.target.value
                }
            })
        }
    }

    
    function checkData(){

        var email = document.getElementById("email").value

        if (validator.isEmail(email) || email === ""){
            return true
        } else {
            alert("Проверьте почту")
            return false
        }
    }

    const sendRequest = () => {
        console.log(filter);
        var check = checkData()
        console.log(check);
        if (check) {
            console.log(filter);
            axios.post("https://sportbox.up.railway.app/api/person/filter", filter,
                {
                    auth: {
                        username: process.env.REACT_APP_USERNAME,
                        password: process.env.REACT_APP_PASSWORD
                    }
                }).then(res => {
                    console.log(res.data);
                    changeFilter(res.data)
                }).catch(() => {
                    alert("Произошла ошибка на сервере!")
                })
        }
    }

    return (
        <div className={classes.filterPanelWrapper}>

            <div className={classes.filterLable}>
                Фильтры поиска
            </div>

            <div className={classes.emailWrapper}>

                <div className={classes.emailLable}>
                    Email:
                </div>

                <div className={classes.fieldEmail}>
                    <input type="email" placeholder="example@example.ru" id="email" name="email"
                        minLength="4" maxLength="35" size="20" onChange={(e) => filtredInput(e)} />
                </div>

            </div>

            <div className={classes.buttonFind}>
                <button className={classes.findButton} type="submit" onClick={() => sendRequest()}>
                    Найти
                </button>
            </div>
        </div>
    )
}
