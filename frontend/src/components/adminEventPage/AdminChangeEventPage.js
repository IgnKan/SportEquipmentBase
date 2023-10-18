import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import classes from '../../css/admin_event_add_page.module.css';

export default function AdminChangeEventPage() {

  useEffect(() => {
    document.title = "Change event"
  }, []);

  const navigate = useNavigate()
  const event = useSelector(state => state.user.dataForChange);
  const [requestToChange, setRequestToChange] = useState({
    name: event.name,
    price: event.price,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    inventoryType: event.inventoryType.type
  })
  console.log(requestToChange.inventoryType);

  const filtredInput = (event) => {
    setRequestToChange((prev) => {
      return {
        ...prev,
        [event.target.id]: event.target.value
      }
    })
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

  const changeEvent = () => {
    var check = checkData()
    console.log(check);
    console.log(requestToChange);
    if (check) {
      axios.put(`https://sportbox.up.railway.app/api/event/change?id=${event.id}`, requestToChange,
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
        <form name="registration-form-wraper">
          <div className={classes.createLabel}>
            Для изменения мероприятия введите новые данные
          </div>

          <div className={classes.accountBox}>
            <div className={classes.accountBoxLabel}>
              Название:
            </div>
            <div className={classes.accountBoxField}>
              <input type="text" id="name" value={requestToChange.name} required onChange={(e) => filtredInput(e)}
                minLength="4" maxLength="35" size="20" />
            </div>
          </div>

          <div className={classes.fullnameBox}>
            <div className={classes.fullnameBoxLabel}>
              Тип оборудования:
            </div>
            <div className={classes.fieldTypeEquipmentBox}>
              <input id="inventoryType" value={event.inventoryType.type} readOnly></input>
            </div>
          </div>

          <div className={classes.firstpasswordBox}>
            <div className={classes.firstpasswordBoxLabel}>
              Цена, руб:
            </div>
            <div className={classes.firstpasswordBoxField}>
              <input type="number" id="price" value={requestToChange.price} required onChange={(e) => filtredInput(e)}
                minLength="4" maxLength="35" size="20" />
            </div>
          </div>

          <div className={classes.firstpasswordBox}>
            <div className={classes.firstpasswordBoxLabel}>
              Дата начала:
            </div>
            <div className={classes.firstpasswordBoxField}>
              <input type="date" id="startDate" value={requestToChange.startDate} required onChange={(e) => filtredInput(e)}
                minLength="4" maxLength="35" size="20" />
            </div>
          </div>

          <div className={classes.firstpasswordBox}>
            <div className={classes.firstpasswordBoxLabel}>
              Дата окончания:
            </div>
            <div className={classes.firstpasswordBoxField}>
              <input type="date" id="endDate" value={requestToChange.endDate} required onChange={(e) => filtredInput(e)}
                minLength="4" maxLength="35" size="20" />
            </div>
          </div>


          <div className={classes.registrationBoxActionBox}>
            <button className={classes.createNewUserButton} type="button" onClick={() => changeEvent()}>
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
