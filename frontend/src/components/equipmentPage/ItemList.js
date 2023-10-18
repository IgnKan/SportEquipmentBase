import React from "react";
import Item from "./Item";
import Pagination from "../supportingComponents/Pagination";

import classes from '../../css/inventory_page.module.css';


function ItemList({ items, itemsPerPage, currentItems, paginate }) {
  return (
    <div className={classes.centreColumnContent}>
      <div className={classes.equipments}>

        {items.map(el => (
          <Item key={el.id} item={el} />
        ))}
      </div>
      <Pagination itemsPerPage={itemsPerPage} totalItems={currentItems.length} paginate={paginate}/>
    </div>
  );
};

export default ItemList;