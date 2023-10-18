import React from "react";

import classes from '../../css/event_page.module.css';

function Event({ event }) {
    return (
        <div className={classes.eventWrapper}>
            <div className={classes.eventImg}>
                <img src={require("../../images/events/" + event.name + ".jpg") } alt="MISSING JPG"></img>
            </div>
            <div className={classes.eventInfoWrapper}>
                <div className={classes.eventName}>
                    {event.name}
                </div>

                <div className={classes.eventDescription}>
                    {event.description}
                </div>

                <div className={classes.eventEquipment}>
                    Необходимое оборудование: {event.inventoryType.type}
                </div>

                <div className={classes.eventDate}>
                    Даты проведения: с {event.startDate} по {event.endDate}
                </div>

                <div className={classes.eventPrice}>
                    {event.price} руб.
                </div>
            </div>
        </div>
    );
};

export default Event;