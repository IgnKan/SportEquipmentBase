import React from "react";
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"
import {setEquipmentForRent} from "../../store/userSlice"
import { useNavigate } from "react-router-dom"

import classes from '../../css/inventory_page.module.css';

function Item({ item }) {

  const isLogged = useSelector(state => state.user.isLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const preRent = (item) => {
    dispatch(setEquipmentForRent(item))
  }

  const handleRentButton = () => {
    if (isLogged === true){
      preRent(item)
      navigate("/about")
      //window.location.href = "/about"
    } else {
      navigate("/enter")
      //window.location.href = "/enter"
    }
  }

  return (
    <div className={classes.equipmentWrapper}>

      <div className={classes.equipmentImg}>
        <img src={require("../../images/inventory/" + item.type + ".jpg")} alt="MISSING JPG" />
      </div>

      <div className={classes.equipmentInfo}>
        <div className={classes.equipmentName}>
          {item.type}
        </div>

        <div className={classes.equipmentPrice}>
          {item.price} руб./день
        </div>
      </div>

      <div className={classes.buttonRent}>
        <button className={classes.rentButton} type="submit" onClick={() => handleRentButton()}>
            Арендовать
        </button>
      </div>

    </div>
  );
};

export default Item;