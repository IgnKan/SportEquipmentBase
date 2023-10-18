import React, { useState, useEffect } from 'react'
import axios from 'axios';

import classes from '../../css/admin_equipment_manager_page.module.css';

export default function AdminEquipmentFilterField({ changeFilter }) {

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
    if (event.target.id === "id") {
      setFilter((prev) => {
        return {
          ...prev,
          [event.target.id]: Number(event.target.value)
        }
      })
    } else if (event.target.id === "inventoryType" && event.target.value === "") {
      setFilter({})
    } else {
      setFilter((prev) => {
        return {
          ...prev,
          [event.target.id]: event.target.value
        }
      })
    }
  }

  function checkData() {
    return true
  }

  const sendFilter = () => {
    var check = checkData()
    if (check) {
      console.log(filter);
      axios.post("https://sportbox.up.railway.app/api/inventory/filter", filter,
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

        <div className={classes.idEquipmentWrapper}>

          <div className={classes.idEquipmentLable}>
            Идентификатор
            <br />
            оборудования:
          </div>

          <div className={classes.fieldIdEquipment}>

            <input type="number" id="id" name="fullName" required onChange={e => filtredInput(e)}
              minLength="4" maxLength="35" size="20" />

          </div>

        </div>

        <div className={classes.buttonFind}>
          <button className={classes.findButton} type="button" onClick={() => sendFilter()}>
            Найти
          </button>
        </div>

      </div>

    </div>
  )
}
