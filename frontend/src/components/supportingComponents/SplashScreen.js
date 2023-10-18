import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

import classes from '../../css/main_page.module.css';

export default function SplashScreen({ loading }) {
    return (
        <div className={classes.splashScreen}>
            <div className={classes.logoClip}>
                SPORTBOX
            </div>
            <div className={classes.downloadText}>

                Приложение загружается. Пожалуйста, подождите.
            </div>
            <ClipLoader
                color={"#1C62CD"}
                loading={loading}
                size={200}
                className="spin"
            />

        </div>
    )
}
