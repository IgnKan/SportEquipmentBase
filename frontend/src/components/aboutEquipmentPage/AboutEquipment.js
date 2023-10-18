import React from "react";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setBooking } from "../../store/userSlice"
import { useNavigate } from "react-router-dom"
import axios from 'axios';

import classes from '../../css/about_equipment_page.module.css';

function AboutEquipment() {

    useEffect(() => {
        document.title = "About equipment"
    }, []);

    const navigate = useNavigate()
    const equipmentForRent = useSelector(state => state.user.equipmentForRent)
    const personId = useSelector(state => state.user.userId)
    const inventoryTypeId = equipmentForRent.id
    const now = new Date()

    const [rentRequest, setRentRequest] = useState({
        personId: personId,
        inventoryTypeId: inventoryTypeId,
        startDate: "",
        endDate: "",
        size: 0
    })

    const filtredInput = (event) => {
        if (event.target.id === "size") {
            setRentRequest((prev) => {
                return {
                    ...prev,
                    [event.target.id]: Number(event.target.value)
                }
            })
        } else {
            setRentRequest((prev) => {
                return {
                    ...prev,
                    [event.target.id]: event.target.value
                }
            })
        }
    }

    function checkData(e) {

        var startDate = document.getElementById("startDate").value
        var endDate = document.getElementById("endDate").value
        var startTime = new Date(startDate)
        var endTime = new Date(endDate)

        if (startDate === "" && endDate !== "") {
            e.preventDefault()
            alert("Заполните дату начала")
            return false

        } else if (startDate !== "" && endDate === "") {
            e.preventDefault()
            alert("Заполните дату окончания")
            return false

        } else if (startTime.getTime() > endTime.getTime()) {
            e.preventDefault()
            alert("Дата начала не может превышать дату окончания")
            return false

        } else if (startTime.getTime() < now.getTime() || endTime.getTime() < now.getTime()) {
            e.preventDefault()
            alert("Дата не может находиться в прошлом")
            return false
        } else {
            return true
        }
    }

    const dispatch = useDispatch()
    const sendBooking = (request) => {
        dispatch(setBooking(request))
    }

    const handleRentButton = (e) => {
        var check = checkData(e)
        if (check) {
            console.log(rentRequest);
            axios.post(`https://sportbox.up.railway.app/api/booking/check`, rentRequest,
                {
                    auth: {
                        username: process.env.REACT_APP_USERNAME,
                        password: process.env.REACT_APP_PASSWORD
                    }
                }).then(res => {
                    if (res.data.status === true) {
                        console.log(res.data);
                        sendBooking(res.data.booking)
                        navigate("/payment")
                    } else {
                        alert(res.data.message)
                    }
                }).catch(() => {
                    alert("Произошла ошибка на сервере!")
                })
        }
    }

    return (
        <div className={classes.basePartSportEquipmentPage}>

            <div className={classes.centreColumnContent}>
                <form>
                    <div className={classes.aboutEquipmentWrapper}>

                        <div className={classes.aboutEquipmentImg}>
                            <img src={require("../../images/inventory/" + equipmentForRent.type + ".jpg")} alt="MISSING JPG" />
                        </div>

                        <div className={classes.aboutEquipmentName}>
                            {equipmentForRent.type}
                        </div>

                        <div className={classes.aboutEquipmentDescription}>
                            {equipmentForRent.description}
                        </div>
                        <div className={classes.aboutEquipmentPrice}>
                            {equipmentForRent.price} руб./день
                        </div>



                        <div className={classes.aboutEquipmentRentDataWrapper}>
                            <div className={classes.rentDataFromLable}>
                                Дата начала аренды:
                            </div>
                            <div className={classes.rentDataToLable}>
                                Дата окончания аренды:
                            </div>
                            <div className={classes.rentSizeLable}>
                                Размер:
                            </div>

                            <div className={classes.fieldRentDataFrom}>
                                <input id="startDate" type="date" name="data-from" required={true} onChange={e => filtredInput(e)}
                                    minLength="4" maxLength="35" size="20"></input>
                            </div>
                            <div className={classes.fieldRentDataTo}>
                                <input id="endDate" type="date" name="data-to" onChange={e => filtredInput(e)}
                                    minLength="4" maxLength="35" size="20"></input>
                            </div>
                            {
                                equipmentForRent.isSizable ? <div className={classes.fieldRentSize}>
                                    <input type="number" id="size" name="fullName" onChange={e => filtredInput(e)}
                                        min="29" maxLength="46"></input>
                                </div>
                                    :
                                    <div className={classes.fieldRentSize}>
                                        <input type="number" value="0" id="size" name="fullName" onChange={e => filtredInput(e)}
                                            min="29" maxLength="46"></input>
                                    </div>
                            }
                        </div>

                        <div className={classes.buttonRent}>
                            <button className={classes.rentButton} type="button" onClick={(e) => handleRentButton(e)}>
                                Арендовать
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AboutEquipment;