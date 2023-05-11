import React from 'react';
import styles from "../stylesheets/Footer.module.css";
import { SiGmail, SiGithub, SiLinkedin, SiWhatsapp } from "react-icons/si";

export const Footer = () => {
    return (
        <div className={styles.ContactMeComponent_container_all}>
            <h1>CONTACTO</h1>
            <div className={styles.ContactMeComponent_seccion} >
                <a href="mailto:francoo_chaparro@hotmail.com" rel="noopener noreferrer" target="_blank">
                    <SiGmail className={styles.ContactMeComponent_icon} />
                </a>
                <a href="https://github.com/FrancooChaparro" rel="noopener noreferrer" target="_blank">
                    <SiGithub className={styles.ContactMeComponent_icon} />
                </a>
                <a href="https://www.linkedin.com/in/franco-chaparro-134743252/" rel="noopener noreferrer" target="_blank">
                    <SiLinkedin className={styles.ContactMeComponent_icon} />
                </a>
                <a href="https://wa.me/541132041229" rel="noopener noreferrer" target="_blank">
                    <SiWhatsapp className={styles.ContactMeComponent_icon} />
                </a>
            </div>
        </div>
    )
}
