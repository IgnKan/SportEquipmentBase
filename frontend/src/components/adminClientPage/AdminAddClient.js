import React, { useState, useEffect } from 'react'
import axios from 'axios';
import validator from 'validator';
import { useNavigate } from "react-router-dom"

import classes from '../../css/admin_client_add_page.module.css';

export default function AdminAddClient() {

    useEffect(() => {
        document.title = "Add client"
    }, []);

    const navigate = useNavigate()
    const [requestToAdd, setRequestToAdd] = useState({
        name: "",
        password: "",
        email: ""
    })

    const filtredInput = (event) => {
        setRequestToAdd((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value
            }
        })
    }

    function checkData() {

        var email = document.getElementById("email").value
        var name = document.getElementById("name").value
        var password = document.getElementById("password").value

        if (!validator.isEmail(email)) {
            alert("Проверьте почту")
            return false
        } else if (name === "") {
            alert("Введите имя")
            return false
        } else if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
            alert("Пароль должен состоять из 8 символов и иметь как заглавные, так и прописные символы")
            return false
        } else {
            return true
        }
    }

    const addClient = () => {
        var check = checkData()
        console.log(check);
        console.log(requestToAdd);
        if (check) {
            axios.post("https://sportbox.up.railway.app/api/person/add", requestToAdd,
                {
                    auth: {
                        username: process.env.REACT_APP_USERNAME,
                        password: process.env.REACT_APP_PASSWORD
                    }
                }).then(res => {
                    console.log(res.data);
                    alert(res.data.message)
                    navigate("/admin/clients")
                }).catch(() => {
                    alert("Произошла ошибка на сервере!")
                })
        }
    }

    return (
        <div className={classes.basePartRegistration}>

            <div className={classes.centreColumnRegistration}>
                <form name={classes.registrationFormWraper}>
                    <div className={classes.createLabel}>
                        Для добавления клиента введите данные
                    </div>


                    <div className={classes.fullnameBox}>
                        <div className={classes.fullnameBoxLabel}>
                            ФИО:
                        </div>
                        <div className={classes.fullnameBoxField}>
                            <input type="text" placeholder="Иванов Иван Иванович" id="name" name="fullName" required
                                minLength="4" maxLength="35" size="20" onChange={(e) => filtredInput(e)} />
                        </div>
                    </div>

                    <div className={classes.accountBox}>
                        <div className={classes.accountBoxLabel}>
                            Адрес эл. почты:
                        </div>
                        <div className={classes.accountBoxField}>
                            <input type="text" placeholder="example@example.ru" id="email" name="login" required
                                minLength="4" maxLength="35" size="20" onChange={(e) => filtredInput(e)} />
                        </div>
                    </div>


                    <div className={classes.firstpasswordBox}>
                        <div className={classes.firstpasswordBoxLabel}>
                            Пароль:
                        </div>
                        <div className={classes.firstpasswordBoxField}>
                            <input type="password" placeholder="********" id="password" name="password" required
                                minLength="4" maxLength="35" size="20" onChange={(e) => filtredInput(e)} />
                        </div>
                    </div>


                    <div className={classes.registrationBoxActionBox}>
                        <button className={classes.createNewUserButton} type="button" onClick={() => addClient()}>
                            <div className={classes.createNewUserButtonText}>
                                Добавить
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
