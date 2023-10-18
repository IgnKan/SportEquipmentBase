import React from "react";
import { useState, useEffect } from 'react';
import ItemList from "./ItemList";
import FilterField from "./FiltreField";
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

import classes from '../../css/inventory_page.module.css';

function EquipmentPage() {

  const [itemList, setItemList] = useState([])
  const [currentItems, setCurrentItems] = useState(itemList)
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)

  useEffect(() => {

    document.title = "Equipments"

    setLoading(true)
    axios.get("https://sportbox.up.railway.app/api/inventory_type/get_all",
      {
        auth: {
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD
        }
      }).then(res => {
        console.log(res.data);
        setItemList(res.data)
        setCurrentItems(res.data)
        setLoading(false)
      }).catch(() => {
        alert("Произошла ошибка на сервере!")
      })
  }, [])

  const changeFilter = (items) => {
    setCurrentItems(items)
    console.log(items);
    setCurrentPage(1)
  }
  

  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const currentItemsOnPage = currentItems.slice(firstItemIndex, lastItemIndex) 


  const paginate = (pageNumder) => {
    setCurrentPage(pageNumder)
  }

  return (
    <div className={classes.basePartSportEquipmentPage}>
      {
        loading ?
          <ClipLoader
            color={"#1C62CD"}
            loading={loading}
            size={200}
            className="spin"
          />
          :
          <>
            <FilterField changeFilter={changeFilter} />
            <ItemList items={currentItemsOnPage} itemsPerPage={itemsPerPage} currentItems={currentItems} paginate={paginate}/>
          </>
      }
    </div>
  );
};

export default EquipmentPage;