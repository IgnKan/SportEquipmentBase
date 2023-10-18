import React from "react";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { unauthorizeUser, updateUser } from "../../store/userSlice"
import { useNavigate } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

import classes from '../../css/profile_page.module.css'

export default function UserProfile({ setIsLogged }) {

  var now = new Date();

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true)
  const userId = useSelector(state => state.user.userId);
  const [user, setUser] = useState({})
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    document.title = "Profile"

    let cleanupFunction = false;
    setLoading(true)
    const fetchData = async () => {
      await axios.get(`https://sportbox.up.railway.app/api/person/profile?id=${userId}`,
        {
          auth: {
            username: process.env.REACT_APP_USERNAME,
            password: process.env.REACT_APP_PASSWORD
          }
        }).then(res => {
          console.log(res.data);
          if (!cleanupFunction) {
            dispatch(updateUser(res.data.person))
            setUser(res.data.person)
            if (res.data.person.role.name === "Admin") {
              setIsAdmin(true)
            } else {
              setIsAdmin(false)
            }
            setLoading(false)
          }

        }).catch(() => {
          alert("Произошла ошибка на сервере!")
        })
    };
    fetchData();
    return () => cleanupFunction = true;
  }, [])

  const cancelBooking = (id) => {
    axios.delete(`https://sportbox.up.railway.app/api/booking/cancel?id=${id}`,
      {
        auth: {
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD
        }
      }).then(res => {
        console.log(res.data);
        alert(res.data.message);
        //window.location.reload();
      }).catch(() => {
        alert("Произошла ошибка на сервере!")
      })
  }


  const logOut = () => {
    dispatch(unauthorizeUser())
    navigate("/")
  }

  const getHistory = () => {
    return user.bookings?.map((el) => {
      return (<div className={classes.row} key={el.id}>

        <div className={classes.orderNumberRow}>
          {el.id}
        </div>

        <div className={classes.orderEquipmentRow}>
          {el.inventory.name}
        </div>

        <div className={classes.orderPriceRow}>
          {el.price}
        </div>

        <div className={classes.orderDataRow}>
          {el.date}
        </div>

        <div className={classes.orderDataFromRow}>
          {el.startDate}
        </div>

        <div className={classes.orderDataToRow}>
          {el.endDate}
        </div>

        <div className={classes.orderDebtRow}>
          {el.debt}
        </div>

        {
          now < new Date(el.startDate) ? <div className={classes.orderActionRow}>
            <div className={classes.buttonCancel}>
              <button className={classes.cancelButton} type="submit" onClick={() => cancelBooking(el.id)}>
                <div className={classes.cancelButtonText}>
                  Отменить
                </div>
              </button>
            </div>
          </div> : false

        }

      </div>)
    });
  }

  return (
    <div>
      {
        loading ?
          <ClipLoader
            color={"#1C62CD"}
            loading={loading}
            size={200}
            className="spin"
          />
          :
          <div className={classes.profileWrapper}>

            <div className={classes.informationAboutUserLable}>
              <p>Информация о пользователе:</p>
            </div>

            <div className={classes.informationAboutUserWrapper}>

              <div className={classes.fullNameUserLable}>
                ФИО:
              </div>
              <div className={classes.fullNameUser}>
                {user.name}
              </div>

              <div className={classes.emailUserLable}>
                Адрес эл. почты:
              </div>

              <div className={classes.emailUser}>
                {user.email}
              </div>

            </div>

            {
              isAdmin ?
                <div></div>
                :
                <div className={classes.informationAboutOrdersWrapper}>

                  <div className={classes.informationAboutOrdersLable}>
                    История заказов:
                  </div>

                  <div className={classes.columnLables}>

                    <div className={classes.orderNumberLable}>
                      №
                    </div>

                    <div className={classes.orderEquipmentLable}>
                      Оборудование
                    </div>

                    <div className={classes.orderPriceLable}>
                      Цена, руб.
                    </div>

                    <div className={classes.orderDataLable}>
                      Дата заказа
                    </div>

                    <div className={classes.orderDataFromLable}>
                      Дата начала
                    </div>

                    <div className={classes.orderDataToLable}>
                      Дата окончания
                    </div>

                    <div className={classes.orderDebtLable}>
                      Долг, руб.
                    </div>

                    <div className={classes.orderActionLable}>

                    </div>
                  </div>

                  <div style={{ width: '100%' }}>
                    <div className={classes.tableWrapper}>
                      <div className={classes.tableRows}>
                        {user.bookings?.length === 0 ? <div className={classes.noOrders}>Пусто</div> : getHistory()}
                      </div>
                    </div>
                  </div>
                </div>


            }
            <div className={classes.buttonExit}>
              <button className={classes.exitButton} type="submit" onClick={logOut}>
                <div className={classes.exitButtonText}>
                  Выйти
                </div>
              </button>
            </div>

          </div>
      }
    </div>
  );
};