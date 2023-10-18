import React, { useEffect } from "react";
import { useSelector } from "react-redux"
import Event from "../eventPage/Event";

import classes from '../../css/recommendation_page.module.css';

function ReccomendationPage() {

    useEffect(() => {
        document.title = "Recommendation"
    }, []);

    const booking = useSelector(state => state.user.booking)

    const getReccomendation = () => {
        return (
            <div className={classes.recommendationEvent}>
                <div className={classes.eventWrapper}>

                    {booking.events.map(el => (
                        <Event key={el.id} event={el} />
                    ))}

                </div>
            </div>
        )
    }

    return (
        <div>
            <div className={classes.centreColumnContent}>
                <div className={classes.recommendationWrapper}>

                    <div className={classes.orderStatus}>
                        Заказ № {booking.id} успешно оплачен.
                    </div>

                    {
                        booking.events.length !== 0 ? <><div className={classes.recommendationLable}>
                            Рекомендуем принять участие в следующих мероприятиях:
                        </div>
                            {getReccomendation()}</>
                            :
                            <div className={classes.recommendationLable}>
                                В настоящее время рекомендованных к Вашему заказу мероприятий нет.
                            </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default ReccomendationPage;