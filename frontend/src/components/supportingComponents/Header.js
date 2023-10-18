import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"

import classes from '../../css/main_page.module.css';

function Header() {

    const isLogged = useSelector(state => state.user.isLogged);
    console.log(useSelector(state => state.user))
    var isAdmin = false
    const role = useSelector(state => {
        if (isLogged === true) {
            return state.user.user.role.name
        } else {
            return ""
        }
    })
    if (role === "Customer" || role === "") {
        isAdmin = false
    } else {
        isAdmin = true
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link className="headLink" to="/">SPORTBOX</Link>
            </div>
            {
                isAdmin ?
                    <div className={classes.menu}>
                        <ul className={classes.leftMenu}>
                            <li><Link className="headLink" to="/">Главная</Link></li>
                            <li><Link className="headLink" to="/admin/equipments">Оборудование</Link></li>
                            <li><Link className="headLink" to="/admin/events">Мероприятия</Link></li>
                            <li><Link className="headLink" to="/admin/clients">Клиенты</Link></li>
                            <li><Link className="headLink" to="/admin/orders">Заказы</Link></li>
                        </ul>
                        <ul className={classes.rightMenu}>
                            <div>
                                <li><Link className="headLink" to="/profile">Профиль</Link></li>
                            </div>

                        </ul>
                    </div>
                    :
                    <div className={classes.menu}>
                        <ul className={classes.leftMenu}>
                            <li><Link className="headLink" to="/">Главная</Link></li>
                            <li><Link className="headLink" to="/equipments">Оборудование</Link></li>
                            <li><Link className="headLink" to="/events">Мероприятия</Link></li>
                        </ul>
                        <ul className={classes.rightMenu}>
                            {
                                isLogged ?
                                    <div>
                                        <li><Link className="headLink" to="/profile">Профиль</Link></li>
                                    </div>
                                    : <div>
                                        <li><Link className="headLink" to="/enter">Вход</Link></li>
                                    </div>
                            }

                        </ul>
                    </div>
            }


        </header>)
}

export default Header