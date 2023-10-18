import React, { useState, useEffect } from 'react'
import axios from 'axios';
import classes from '../../css/admin_event_manager_page.module.css';

export default function AdminEventFilterField({ changeFilter }) {

  const [filter, setFilter] = useState({})
  const [types, setTypes] = useState([])

  useEffect(() => {
    axios.get("https://sportbox.up.railway.app/api/inventory_type/get_all",
      {
        auth: {
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD
        }
      }).then(res => {
        console.log(res.data);
        setTypes(res.data)
      }).catch(() => {
        alert("Произошла ошибка на сервере!")
      })
  }, [])

  const filtredInput = (event) => {
    setFilter((prev) => {
      return {
        ...prev,
        [event.target.id]: event.target.value
      }
    })
  }

  function checkData() {

    var startDate = document.getElementById("startDate").value
    var endDate = document.getElementById("endDate").value

    if (startDate === "" && endDate !== ""){
      alert("Заполните дату начала")
      return false
    } else if (startDate !== "" && endDate === ""){
      alert("Заполните дату окончания")
      return false
    } else {
      return true
    }
  }

  const sendFilter = () => {
    var check = checkData()
    if (check) {
      console.log(filter);
      axios.post("https://sportbox.up.railway.app/api/event/filter", filter,
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

  const getTypes = () => {
    return types.map((type) => {
      return <option key={type.id} value={type.type}>{type.type}</option>;
    });
  }


  return (
    <div className={classes.filterPanelWrapper}>

      <div className={classes.filterLable}>
        Фильтры поиска
      </div>

      <div className={classes.typeEquipmentWrapper}>

        <div className={classes.typeEquipmentLable}>
          Тип оборудования:
        </div>

        <div className={classes.fieldTypeEquipment}>

          <select id="inventoryType" name="type-equipment" onChange={(e) => filtredInput(e)}>
            <option key="-" value="">
              Выберите тип
            </option>
            {getTypes()}
          </select>
        </div>

      </div>

      <div className={classes.idEquipmentWrapper}>

        <div className={classes.idEquipmentLable}>
          Дата начала:
        </div>

        <div className={classes.fieldIdEquipment}>

          <input type="date" id="startDate" name="fullName" required minLength="4" maxLength="35" onChange={(e) => filtredInput(e)}
            size="20" />

        </div>

      </div>

      <div className={classes.idEquipmentWrapper}>

        <div className={classes.idEquipmentLable}>
          Дата окончания:
        </div>

        <div className={classes.fieldIdEquipment}>

          <input type="date" id="endDate" name="fullName" required minLength="4" maxLength="35" onChange={(e) => filtredInput(e)}
            size="20" />

        </div>

      </div>


      <div className={classes.buttonFind}>
        <button className={classes.findButton} type="button" onClick={() => sendFilter()}>
          Найти
        </button>
      </div>
    </div>
  )
}
