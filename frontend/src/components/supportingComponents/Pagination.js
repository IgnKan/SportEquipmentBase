import React from "react";

import classes from '../../css/event_page.module.css';

function Pagination({ itemsPerPage, totalItems, paginate }) {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++){
        pageNumbers.push(i)
    }
    console.log(totalItems);
    console.log(itemsPerPage);
    console.log(pageNumbers.length);

    return (
        <div className={classes.paginationBar}>
            <ul className={classes.pagination}>
                    {
                        pageNumbers.map(page => (
                            <li key={page}>
                                <a onClick={() => paginate(page)}>{page}</a>
                            </li>
                        ))
                    }
                </ul>
        </div>
    );
};

export default Pagination;