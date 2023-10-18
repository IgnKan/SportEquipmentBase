import React from 'react'
import Order from "./Order"

import classes from '../../css/admin_order_manager_page.module.css';

export default function AdminOrderList({ orders }) {

  console.log(orders);
  return (
    <div className={classes.tableManagerWrapper}>

      <div className={classes.voidBox}>
      </div>

      <div className={classes.tableWrapper}>
        <div className={classes.columnLables}>
          <div className={classes.eventIdLable}>
            Id
          </div>
          <div className={classes.eventNameLable}>
            Оборудование
          </div>
          <div className={classes.eventEquipmentTypeLable}>
            Email
          </div>
          <div className={classes.eventPriceLable}>
            Цена, руб.
          </div>
          <div className={classes.eventDataFromLable}>
            Дата заказа
          </div>
          <div className={classes.eventDataFromLable}>
            Дата начала
          </div>
          <div className={classes.eventDataFromLable}>
            Дата окончания
          </div>
          <div className={classes.eventDebtLable}>
            Долг, руб
          </div>
          <div className={classes.eventActionLable}>

          </div>
        </div>

        <div className={classes.tableRows}>
        {
            
            orders.map(order => {
              console.log(orders.length);
              if (orders[0] === null) {
                return false
              } else {
                return <Order key={order.id} order={order}></Order>
              }
            })
          }
        </div>
      </div>

    </div>
  )
}
