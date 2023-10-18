import React, { useState, useEffect } from 'react'
import AdminEventFilterField from "./AdminEventFilterField"
import AdminEventList from "./AdminEventList"
import classes from '../../css/admin_event_manager_page.module.css';

import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

export default function AdminEventManagerPage() {

    const [events, setEvents] = useState([])
    const [currentEvents, setCurrentEvents] = useState(events)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        document.title = "Manager events"

        setLoading(true)
        axios.post("https://sportbox.up.railway.app/api/event/filter", {},
            {
                auth: {
                    username: process.env.REACT_APP_USERNAME,
                    password: process.env.REACT_APP_PASSWORD
                }
            }).then(res => {
                console.log(res.data);
                setEvents(res.data)
                setCurrentEvents(res.data)
                setLoading(false)
            }).catch(() => {
                alert("Произошла ошибка на сервере!")
            })
    }, [])

    const changeFilter = (events) => {
        setCurrentEvents(events)
    }

    return (
        loading ?
            <ClipLoader
                color={"#1C62CD"}
                loading={loading}
                size={200}
                className="spin"
            />
            :
            <div className={classes.managerWrapper}>
                {

                    <>
                        <AdminEventFilterField changeFilter={changeFilter} ></AdminEventFilterField>
                        <AdminEventList events={currentEvents}></AdminEventList>
                    </>
                }
            </div>
    )
}
