import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import classes from '../../css/admin_event_add_page.module.css';
import { useNavigate } from "react-router-dom"

export default function AdminAddEventPage() {

    const navigate = useNavigate()
    const [types, setTypes] = useState([])
    const [loading, setLoading] = useState(true)
    const [requestToAdd, setRequestToAdd] = useState({})

    useEffect(() => {

        document.title = "Add event"

        setLoading(true)
        axios.get("https://sportbox.up.railway.app/api/inventory_type/get_all",
            {
                auth: {
                    username: process.env.REACT_APP_USERNAME,
                    password: process.env.REACT_APP_PASSWORD
                }
            }).then(res => {
                console.log(res.data);
                setTypes(res.data)
                setLoading(false)
            }).catch(() => {
                alert("Произошла ошибка на сервере!")
            })
    }, [])

    const filtredInput = (event) => {
        setRequestToAdd((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value
            }
        })
    }

    const getTypes = () => {
        return types.map((type) => {
            return <option key={type.id} value={type.type}>{type.type}</option>;
        });
    }

    function checkData() {

        var inventoryType = document.getElementById("inventoryType").value
        var name = document.getElementById("name").value
        var price = document.getElementById("price").value
        var startDate = document.getElementById("startDate").value
        var endDate = document.getElementById("endDate").value

        if (inventoryType === "") {
            alert("Пожалуйста выберете тип оборудования")
            return false
        } else if (name === "") {
            alert("Введите название")
            return false
        } else if (price === 0) {
            alert("Введите цену")
            return false
        } else if (startDate === "") {
            alert("Введите дату начала")
            return false
        } else if (endDate === "") {
            alert("Введите дату окончания")
            return false
        } else {
            return true
        }
    }

    const addEvent = () => {
        var check = checkData()
        console.log(check);
        console.log(requestToAdd);
        if (check) {
            axios.post("https://sportbox.up.railway.app/api/event/add", requestToAdd,
                {
                    auth: {
                        username: process.env.REACT_APP_USERNAME,
                        password: process.env.REACT_APP_PASSWORD
                    }
                }).then(res => {
                    console.log(res.data);
                    alert(res.data.message)
                    navigate("/admin/events")
                }).catch(() => {
                    alert("An error occurred on the server")
                })
        }
    }

    return (
        <div className={classes.basePartRegistration}>
            {
                loading ?
                    <ClipLoader
                        color={"#1C62CD"}
                        loading={loading}
                        size={200}
                        className='spin'
                    />
                    : <div className={classes.centreColumnRegistration}>
                        <form name="registration-form-wraper">
                            <div className={classes.createLabel}>
                                Для добавления мероприятия введите данные
                            </div>

                            <div className={classes.accountBox}>
                                <div className={classes.accountBoxLabel}>
                                    Название:
                                </div>
                                <div className={classes.accountBoxField}>
                                    <input type="text" id="name" required
                                        minLength="4" maxLength="35" size="20" onChange={(e) => filtredInput(e)} />
                                </div>
                            </div>

                            <div className={classes.fullnameBox}>
                                <div className={classes.fullnameBoxLabel}>
                                    Тип оборудования:
                                </div>
                                <div className={classes.fieldTypeEquipmentBox}>
                                    <select id="inventoryType" name="type-equipment" onChange={(e) => filtredInput(e)}>
                                        <option key="-" value="">
                                            Выберите тип
                                        </option>
                                        {getTypes()}
                                    </select>
                                </div>
                            </div>

                            <div className={classes.firstpasswordBox}>
                                <div className={classes.firstpasswordBoxLabel}>
                                    Цена, руб:
                                </div>
                                <div className={classes.firstpasswordBoxField}>
                                    <input type="number" id="price" required
                                        minLength="4" maxLength="35" size="20" onChange={(e) => filtredInput(e)} />
                                </div>
                            </div>

                            <div className={classes.firstpasswordBox}>
                                <div className={classes.firstpasswordBoxLabel}>
                                    Дата начала:
                                </div>
                                <div className={classes.firstpasswordBoxField}>
                                    <input type="date" id="startDate" required
                                        minLength="4" maxLength="35" size="20" onChange={(e) => filtredInput(e)} />
                                </div>
                            </div>

                            <div className={classes.firstpasswordBox}>
                                <div className={classes.firstpasswordBoxLabel}>
                                    Дата окончания:
                                </div>
                                <div className={classes.firstpasswordBoxField}>
                                    <input type="date" id="endDate" required
                                        minLength="4" maxLength="35" size="20" onChange={(e) => filtredInput(e)} />
                                </div>
                            </div>


                            <div className={classes.registrationBoxActionBox}>
                                <button className={classes.createNewUserButton} type="button" onClick={() => addEvent()}>
                                    <div className={classes.createNewUserButtonText}>
                                        Добавить
                                    </div>
                                </button>
                            </div>
                        </form>

                    </div>
            }
        </div>
    )
}
