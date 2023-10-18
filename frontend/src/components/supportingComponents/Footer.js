import React, { useState, useEffect } from "react";
import classes from "../../css/main_page.module.css";
import { getRemoteConfig, getValue, fetchAndActivate } from "firebase/remote-config";
import { initializeApp } from "firebase/app";

function Footer() {
    const firebaseConfig = {
        apiKey: "AIzaSyBim417nB_Wg8297p3cWnZr0ozRleb83ho",
        authDomain: "sportequipmentstatistics.firebaseapp.com",
        projectId: "sportequipmentstatistics",
        storageBucket: "sportequipmentstatistics.appspot.com",
        messagingSenderId: "582427848609",
        appId: "1:582427848609:web:8a4e261bd125dbc700e5e0",
        measurementId: "G-EDC7KMW5BP"
    };

    const app = initializeApp(firebaseConfig);

    const remoteConfig = getRemoteConfig(app);
    console.log(remoteConfig);
    const [actualAddress, setActualAddress] = useState("Университетская пл, 1");
    const [actualTelephoneNumber, setActualTelephoneNumber] = useState("+7 (473) 276-23-74");

    useEffect(() => {
        const fetchRemoteConfig = async () => {
            await fetchAndActivate(remoteConfig);

            
            const addressValue = getValue(remoteConfig, "actualAddress");
            const telephoneNumberValue = getValue(remoteConfig, "actualTelephoneNumber");
            console.log(addressValue);
            console.log(telephoneNumberValue);

            setActualAddress(addressValue.asString());
            setActualTelephoneNumber(telephoneNumberValue.asString());
        };

        fetchRemoteConfig().catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <footer className={classes.footer}>
            <div className={classes.contacts}>
                <p>
                    КОНТАКТНАЯ ИНФОРМАЦИЯ:
                    <br />
                    <br />
                    394018, Россия, г. Воронеж,
                    <br />
                    {actualAddress}
                    <br />
                    {actualTelephoneNumber}
                    <br />
                    bkatya5577@gmail.com
                    <br />
                    ignat_kandaurov@mail.ru
                    <br />
                    kornilov.ilja@rambler.ru

                </p>
            </div>

            <div className={classes.developers}>
                <p>
                    РАЗРАБОТЧИКИ:
                    <br />
                    <br />
                    И.Р. Корнилов,
                    <br />
                    <br />
                    Е.А. Бабкина,
                    <br />
                    <br />
                    И.А. Кандауров
                </p>
            </div>
        </footer>)
}

export default Footer