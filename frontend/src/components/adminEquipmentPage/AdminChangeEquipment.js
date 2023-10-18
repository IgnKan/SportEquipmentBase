import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import classes from '../../css/admin_equipment_add_page.module.css';

export default function AdminChangeEquipment() {

    useEffect(() => {
        document.title = "Change equipment"
    }, []);

    const navigate = useNavigate()
    const equipment = useSelector(state => state.user.dataForChange);
    const [requestToChange, setRequestToChange] = useState(() => {
        if (equipment.inventoryType.isSizable === true) {
            return {
                inventoryType: equipment.inventoryType.type,
                name: equipment.name,
                size: equipment.size
            }
        } else {
            return {
                inventoryType: equipment.inventoryType.type,
                name: equipment.name
            }
        }

    })

    const filtredInput = (event) => {

        if (event.target.id === "size") {
            setRequestToChange((prev) => {
                return {
                    ...prev,
                    [event.target.id]: Number(event.target.value)
                }
            })
        } else {
            setRequestToChange((prev) => {
                return {
                    ...prev,
                    [event.target.id]: event.target.value
                }
            })
        }

    }

    function checkData() {

        var inventoryType = document.getElementById("inventoryType").value
        var name = document.getElementById("name").value
        var size = "";

        if (equipment.inventoryType.isSizable === true) {
            size = document.getElementById("size").value
            if (Number(size) > 45 || Number(size) < 29) {
                alert("Размер должен быть в диапазоне от 29 до 45")
                return false
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

    const changeEquipment = () => {
        var check = checkData()
        console.log(check);
        console.log(requestToChange);
        if (check) {
            axios.put(`https://sportbox.up.railway.app/api/inventory/change?id=${equipment.id}`, requestToChange,
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

        <div className={classes.basePartRegistration}>
            <div className={classes.centreColumnRegistration}>
                <form name={classes.registrationFormWraper}>
                    <div className={classes.createLabel}>
                        Для изменения оборудования введите новые данные
                    </div>


                    <div className={classes.fullnameBox}>
                        <div className={classes.fullnameBoxLabel}>
                            Тип оборудования:
                        </div>
                        <div className={classes.fieldTypeEquipmentBox}>
                            <input id="inventoryType" name="type-equipment" value={equipment.inventoryType.type} readOnly></input>
                        </div>
                    </div>

                    <div className={classes.accountBox}>
                        <div className={classes.accountBoxLabel}>
                            Название:
                        </div>
                        <div className={classes.accountBoxField}>
                            <input type="text" value={requestToChange.name} id="name" name="login" required onChange={(e) => filtredInput(e)}
                                minLength="4" maxLength="50" size="20" />
                        </div>
                    </div>

                    {
                        equipment.inventoryType.isSizable ? <div className={classes.firstpasswordBox}>
                            <div className={classes.firstpasswordBoxLabel}>
                                Размер:
                            </div>
                            <div className={classes.firstpasswordBoxField}>
                                <input type="text" value={requestToChange.size} id="size" name="password" required onChange={(e) => filtredInput(e)}
                                />
                            </div>
                        </div> : false
                    }



                    <div className={classes.registrationBoxActionBox}>
                        <button className={classes.createNewUserButton} type="button" onClick={() => changeEquipment()}>
                            <div className={classes.createNewUserButtonText}>
                                Изменить
                            </div>
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}
