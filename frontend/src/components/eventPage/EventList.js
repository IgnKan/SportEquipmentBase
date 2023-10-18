import React from "react";
import Event from "./Event"
import Pagination from "../supportingComponents/Pagination";

import classes from '../../css/event_page.module.css';

function EventList({ events, eventsPerPage, currentEvents, paginate }) {
    return (
        <div className={classes.centreColumnContent}>
            <div className={classes.events}>
                {
                    events.length === 0 ? <div style={{height: '600px'}}>

                    </div>
                        :
                        events.map(el => (
                            <Event key={el.id} event={el} />
                        ))
                }
            </div>
            <Pagination itemsPerPage={eventsPerPage} totalItems={currentEvents.length} paginate={paginate} />
        </div>
    );
};

export default EventList;