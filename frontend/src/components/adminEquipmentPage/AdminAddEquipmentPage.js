import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom"

import classes from '../../css/admin_equipment_add_page.module.css';

export default function AdminAddEquipmentPage() {

    const navigate = useNavigate()
    const [types, setTypes] = useState([])
    const [loading, setLoading] = useState(true)
    const [requestToAdd, setRequestToAdd] = useState({
        inventoryType: "",
        name: ""
    })

    useEffect(() => {

        document.title = "Add equipment"

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

        if (event.target.id === "size") {
            for (let i = 0; i < types.length; i++) {
                if (requestToAdd.inventoryType === types[i].type) {
                    if (types[i].isSizable === true) {
                        setRequestToAdd((prev) => {
                            return {
                                ...prev,
                                [event.target.id]: Number(event.target.value)
                            }
                        })
                    } else {
                        setRequestToAdd((prev) => {
                            return {
                                ...prev
                            }
                        })
                    }
                }
            }
        } else {
            setRequestToAdd((prev) => {
                return {
                    ...prev,
                    [event.target.id]: event.target.value
                }
            })
        }

    }

    const getTypes = () => {
        return types.map((type) => {
            return <option key={type.id} value={type.type}>{type.type}</option>;
        });
    }

    function checkData() {

        var inventoryType = document.getElementById("inventoryType").value
        var name = document.getElementById("name").value

        var size = "";
        console.log(requestToAdd);
        for (let i = 0; i < types.length; i++) {
            if (requestToAdd.inventoryType === types[i].type) {
                if (types[i].isSizable === true) {
                    size = document.getElementById("size").value
                    if (Number(size) > 45 || Number(size) < 29) {
                        alert("Размер должен быть в диапазоне от 29 до 45")
                        return false
                    }
                }
            }
        }

        if (inventoryType === "") {
            alert("Пожалуйста выберете тип оборудования")
            return false
        } else if (name === "") {
            alert("Введите название")
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
            axios.post("https://sportbox.up.railway.app/api/inventory/add", requestToAdd,
                {
                    auth: {
                        username: process.env.REACT_APP_USERNAME,
                        password: process.env.REACT_APP_PASSWORD
                    }
                }).then(res => {
                    console.log(res.data);
                    alert(res.data.message)
                    navigate("/admin/equipments")
                }).catch(() => {
                    alert("Произошла ошибка на сервере!")
                })
        }
    }

    return (

        <div className={classes.centreColumnRegistration}>
            {
                loading ?
                    <ClipLoader
                        color={"#1C62CD"}
                        loading={loading}
                        size={200}
                        className='spin'
                    />
                    :

                    <form name={classes.registrationFormWraper}>
                        <div className={classes.createLabel}>
                            Для добавления оборудования введите данные
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

                        <div className={classes.accountBox}>
                            <div className={classes.accountBoxLabel}>
                                Название:
                            </div>
                            <div className={classes.accountBoxField}>
                                <input type="text" id="name" name="login" required onChange={(e) => filtredInput(e)}
                                    minLength="4" maxLength="35" size="20" />
                            </div>
                        </div>


                        <div className={classes.firstpasswordBox}>
                            <div className={classes.firstpasswordBoxLabel}>
                                Размер:
                            </div>
                            <div className={classes.firstpasswordBoxField}>
                                <input type="text" id="size" name="password" required onChange={(e) => filtredInput(e)}
                                    minLength="4" maxLength="35"
                                    size="20" />
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
            }
        </div>

    )
}
