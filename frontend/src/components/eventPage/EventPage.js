import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import FilterEventField from "./FilterEventField"
import EventList from "./EventList";
import ClipLoader from "react-spinners/ClipLoader";

import classes from '../../css/event_page.module.css';

function EventPage() {

  const [loading, setLoading] = useState(true)
  const [eventList, setEventList] = useState([])
  const [currentEvents, setCurrentEvents] = useState(eventList)

  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage] = useState(4)


  useEffect(() => {

    document.title = "Events"

    setLoading(true)
    axios.post("https://sportbox.up.railway.app/api/event/filter", {},
      {
        auth: {
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD
        }
      }).then(res => {
        console.log(res.data);
        setEventList(res.data)
        setCurrentEvents(res.data)
        setLoading(false)
      }).catch(() => {
        alert("Произошла ошибка на сервере!")
      })
  }, [])

  const changeFilter = (items) => {
    setCurrentEvents(items)
    setCurrentPage(1)
  }

  const lastEventIndex = currentPage * eventsPerPage
  const firstEventIndex = lastEventIndex - eventsPerPage
  const currentEventsOnPage = currentEvents.slice(firstEventIndex, lastEventIndex)

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
            <FilterEventField changeFilter={changeFilter}></FilterEventField>
            <EventList events={currentEventsOnPage}
              eventsPerPage={eventsPerPage} 
              currentEvents={currentEvents} 
              paginate={paginate} ></EventList>
          </>
      }

    </div>
  );
};

export default EventPage;