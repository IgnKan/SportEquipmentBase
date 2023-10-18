import React, { useState, useEffect } from 'react'
import AdminClientFilterField from './AdminClientFilterField'
import AdminClientList from './AdminClientList'
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

import classes from '../../css/admin_client_manager_page.module.css';

export default function AdminClientManagerPage() {

  const [clients, setClients] = useState([])
  const [currentClients, setCurrentClients] = useState(clients)
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    document.title = "Manager clients"

    setLoading(true)
    axios.post("https://sportbox.up.railway.app/api/person/filter", {},
      {
        auth: {
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD
        }
      }).then(res => {
        console.log(res.data);
        setClients(res.data)
        setCurrentClients(res.data)
        setLoading(false)
      }).catch(() => {
        alert("Произошла ошибка на сервере!")
      })
  }, [])

  const changeFilter = (clients) => {
    setCurrentClients(clients)
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
            <AdminClientFilterField changeFilter={changeFilter} ></AdminClientFilterField>
            <AdminClientList clients={currentClients}></AdminClientList>
          </>
        }
      </div>
  )
}
