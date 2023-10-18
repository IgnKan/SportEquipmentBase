import React from 'react'
import Event from "./Event"
import { useNavigate } from "react-router-dom"
import classes from '../../css/admin_event_manager_page.module.css';

export default function AdminEventList({ events }) {

  const navigate = useNavigate()
  const linkToAddPage = () => {
    navigate("/admin/events/add")
  }

  return (
    <div className={classes.tableManagerWrapper}>

      <div className={classes.buttonAdd}>
        <button className={classes.addButton} type="button" onClick={() => linkToAddPage()}>
          Добавить мероприятие
        </button>
      </div>

      <div className={classes.tableWrapper}>
        <div className={classes.columnLables}>
          <div className={classes.eventIdLable}>
            Id
          </div>
          <div className={classes.eventNameLable}>
            Название
          </div>
          <div className={classes.eventEquipmentTypeLable}>
            Тип оборудования
          </div>
          <div className={classes.eventPriceLable}>
            Цена, руб.
          </div>
          <div className={classes.eventDataFromLable}>
            Дата начала
          </div>
          <div className={classes.eventDataFromLable}>
            Дата окончания
          </div>
          <div className={classes.eventActionLable}>

          </div>
          <div className={classes.eventActionLable}>

          </div>
        </div>

        <div className={classes.tableRows}>

        {
            events.map(event => {
              console.log(events.length);
              if (events[0] === null) {
                return false
              } else {
                return <Event key={event.id} event={event}></Event>
              }
            })
          }
          
        </div>

      </div>
    </div>
  )
}
