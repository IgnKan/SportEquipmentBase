import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { authorizeUser } from "../../store/userSlice"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import axios from 'axios';
import validator from 'validator';

import classes from '../../css/registration_page.module.css';

function RegisterPage({ setIsLogged }) {

    useEffect(() => {
        document.title = "Register"
     }, []);

    const navigate = useNavigate()
    const [register, setRegister] = useState(() => {
        return {
            usermame: "",
            email: "",
            password: ""
        }
    })

    const changeInputRegister = event => {
        event.persist()
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const dispatch = useDispatch();

    const authorize = (person) => {
        dispatch(authorizeUser(person));
    }

    function submitChacking(event) {
        event.preventDefault();
        if (!validator.isEmail(register.email)) {
            alert("You did not enter email")
        } else if (!validator.isStrongPassword(register.password, { minSymbols: 0 })) {
            alert("Password must consist of one lowercase, uppercase letter and number, at least 8 characters")
        } else {
            axios.post("https://sportbox.up.railway.app/api/person/add", {
                name: register.usermame,
                email: register.email,
                password: register.password
            },
                {
                    auth: {
                        username: process.env.REACT_APP_USERNAME,
                        password: process.env.REACT_APP_PASSWORD
                    }
                }).then(res => {
                    if (res.data.status === true) {
                        authorize(res.data.person)
                        navigate("/enter")
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

                        Для регистрации введите данные

                    </div>

                    <div className={classes.fullnameBox}>
                        <div className={classes.fullnameBoxLabel}>
                            ФИО:
                        </div>
                        <div className={classes.fullnameBoxField}>
                            <input type="text" placeholder="Иванов Иван Иванович" id="usermame" name="usermame" value={register.usermame}
                                onChange={(e) => changeInputRegister(e)} required maxLength="35" size="20"></input>
                        </div>
                    </div>

                    <div className={classes.accountBox}>
                        <div className={classes.accountBoxLabel}>
                            Адрес эл. почты:
                        </div>
                        <div className={classes.accountBoxField}>
                            <input type="text" placeholder="example@example.ru" id="email" name="email" value={register.email}
                                onChange={(e) => changeInputRegister(e)} required maxLength="35" size="20"></input>
                        </div>
                    </div>

                    <div className={classes.firstpasswordBox}>
                        <div className={classes.firstpasswordBoxLabel}>
                            Пароль:
                        </div>
                        <div className={classes.firstpasswordBoxField}>
                            <input type="password" placeholder="********" id="password" name="password" value={register.password}
                                onChange={(e) => changeInputRegister(e)} required maxLength="35" size="20"></input>
                        </div>
                    </div>



                    <div className={classes.registrationBoxActionBox}>
                        <button className={classes.createNewUserButton} type="submit">
                            <div className={classes.createNewUserButtonText}>
                                Зарегистрироваться
                            </div>
                        </button>
                    </div>

                    <div className={classes.loginBoxActionBox}>
                        <Link className="headLink" to="/enter">Войти, если есть аккаунт</Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RegisterPage;