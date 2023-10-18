import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

import classes from '../../css/event_page.module.css';

function FilterEventField({ changeFilter }) {

    const [typesForEvent, setTypesForEvent] = useState([])
    const [filterForEvent, setFilterForEvent] = useState({
        inventoryType: "",
        startDate: "",
        endDate: "",
    })

    useEffect(() => {
        axios.get("https://sportbox.up.railway.app/api/inventory_type/get_all",
            {
                auth: {
                    username: process.env.REACT_APP_USERNAME,
                    password: process.env.REACT_APP_PASSWORD
                }
            }).then(res => {
                setTypesForEvent(res.data)
            }).catch(() => {
                alert("Произошла ошибка на сервере!")
            })
    }, [])

    function checkData() {

        var startDate = document.getElementById("startDate").value
        var endDate = document.getElementById("endDate").value
        var startTime = new Date(startDate)
        var endTime = new Date(endDate)

        if (startDate === "" && endDate !== "") {
            alert("Заполните дату начала")
            return false
        } else if (startDate !== "" && endDate === "") {
            alert("Заполните дату окончания")
            return false
        } else if (startTime.getTime() > endTime.getTime()) {
            alert("Дата начала не может превышать дату окончания")
            return false
        } else {
            return true
        }
    }

    const sendFilter = () => {
        var check = checkData()
        console.log(filterForEvent);
        if (check) {
            axios.post("https://sportbox.up.railway.app/api/event/filter", filterForEvent,
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

    const filtredInput = (event) => {
        setFilterForEvent((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value
            }
        })

    }

    const getTypes = () => {
        return typesForEvent.map((type) => {
            return <option key={type.id} value={type.type}>{type.type}</option>;
        });
    }

    return (

        <div className={classes.leftColumnFilters}>
            <div className={classes.filterPanel}>

                <div className={classes.filtersLabel}>
                    Фильтры поиска
                </div>

                <div className={classes.typeEquipmentBox}>

                    <div className={classes.labelTypeEquipmentBox}>
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

                <div className={classes.startDataBox}>

                    <div className={classes.labelStartDataBox}>
                        Дата начала:
                    </div>

                    <div className={classes.fieldStartDataBox}>
                        <input id="startDate" type="date" name="fullName" onChange={e => filtredInput(e)}
                            minLength="4" maxLength="35" size="20"></input>
                    </div>

                </div>

                <div className={classes.endDataBox}>

                    <div className={classes.labelEndDataBox}>
                        Дата окончания:
                    </div>

                    <div className={classes.fieldEndDataBox}>
                        <input id="endDate" type="date" name="fullName" onChange={e => filtredInput(e)}
                            minLength="4" maxLength="35" size="20"></input>
                    </div>

                </div>

                <div className={classes.buttonFind}>
                    <button className={classes.findButton} type="submit" onClick={() => sendFilter()}>
                        Найти
                    </button>
                </div>

            </div>
        </div>
    )
}

export default FilterEventField;