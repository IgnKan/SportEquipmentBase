import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { authorizeUser } from "../../store/userSlice"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import axios from 'axios';
import validator from 'validator';

import classes from '../../css/login.module.css';

const EnterPage = () => {

    useEffect(() => {
        document.title = "Login"
     }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const authorize = (person) => {
        dispatch(authorizeUser(person));
    }

    const [login, setLogin] = useState(() => {
        return {
            email: "",
            password: ""
        }
    })

    const changeInputLogin = event => {
        event.persist()
        setLogin(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    function submitChacking(event) {
        event.preventDefault();
        if (!validator.isEmail(login.email)) {
            alert("You did not enter email")
        } else {
            axios.post("https://sportbox.up.railway.app/api/person/login", {
                email: login.email,
                password: login.password
            },
                {
                    auth: {
                        username: process.env.REACT_APP_USERNAME,
                        password: process.env.REACT_APP_PASSWORD
                    }
                }).then(res => {
                    if (res.data.status === true) {
                        console.log(res.data);
                        authorize(res.data.person)
                        navigate("/")
                    } else {
                        alert(res.data.message)
                    }
                }).catch(() => {
                    alert("Произошла ошибка на сервере!")
                })
        }

    }

    return (
        <div className={classes.basePartRegistration}>
            <div className={classes.centreColumnRegistration}>
                <form name={classes.registrationFormWraper} onSubmit={(e) => submitChacking(e)}>

                    <div className={classes.createLabel}>
                        Для входа введите данные
                    </div>

                    <div className={classes.accountBox}>
                        <div className={classes.accountBoxLabel}>
                            <b>Адрес эл. почты:</b>
                        </div>
                        <div className={classes.accountBoxField}>
                            <input type="text" placeholder="example@example.ru" id="email" name="email" value={login.email}
                                onChange={(e) => changeInputLogin(e)} required maxLength="35" size="20"></input>
                        </div>
                    </div>

                    <div className={classes.firstpasswordBox}>
                        <div className={classes.firstpasswordBoxLabel}>
                            <b>Пароль:</b>
                        </div>
                        <div className={classes.firstpasswordBoxField}>
                            <input type="password" placeholder="********" id="password" name="password" value={login.password}
                                onChange={(e) => changeInputLogin(e)} required maxLength="35" size="20"></input>
                        </div>
                    </div>


                    <div className={classes.registrationBoxActionBox}>

                        <button className={classes.createNewUserButton} type="submit">
                            <div className={classes.createNewUserButtonText}>
                                Войти
                            </div>
                        </button>

                    </div>

                    <div className={classes.loginBoxActionBox}>
                        <Link className="headLink" to="/api/person/add">Зарегистрироваться, если нет аккаунта</Link>
                    </div>

                </form>

            </div>

        </div>
    );
};

export default EnterPage;