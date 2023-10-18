import React from 'react'
import Equipment from "./Equipment"
import { useNavigate } from "react-router-dom"

import classes from '../../css/admin_equipment_manager_page.module.css';

export default function AdminEquipmentList({ equipments }) {

  const navigate = useNavigate()
  const linkToAddPage = () => {
    navigate("/admin/equipments/add")
  }

  return (
    <div className={classes.tableManagerWrapper}>

      <div className={classes.buttonAdd}>
        <button className={classes.addButton} type="submit" onClick={() => linkToAddPage()}>
          Добавить оборудование
        </button>
      </div>

      <div className={classes.tableWrapper}>
        <div className={classes.columnLables}>
          <div className={classes.orderNumberLable}>
            Id
          </div>
          <div className={classes.orderEquipmentLable}>
            Название
          </div>
          <div className={classes.orderPriceLable}>
            Тип
          </div>
          <div className={classes.orderDataLable}>
            Размер
          </div>
          <div className={classes.orderDataFromLable}>
            Цена в день, руб.
          </div>
          <div className={classes.orderActionLable}>

          </div>
          <div className={classes.orderActionLable}>

          </div>
        </div>

        <div className={classes.tableRows}>

          {
            equipments.map(equipment => {
              console.log(equipments.length);
              if (equipments[0] === null) {
                return false
              } else {
                return <Equipment key={equipment.id} equipment={equipment}></Equipment>
              }
            })
          }

        </div>
      </div>
    </div>
  )
}
