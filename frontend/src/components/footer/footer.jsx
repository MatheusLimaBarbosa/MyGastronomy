import styles from './footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return(
        <footer className={styles.footerContainer}>
            <img src="/imgs/logo.png" alt="" />
            <div>
                <div className={styles.linksContainer}>
                    <Link className={styles.link} to={'/'}>Homepage</Link>
                    <Link className={styles.link} to={'/plates'}>Plates</Link>
                    <Link className={styles.link} to={'/profile'}>Profile</Link>
                </div>
            </div>

            <div>
                Developed by Matheus Lima Barbosa.
                <a href="https://github.com/MatheusLimaBarbosa" target='_blank' className={styles.link}> See my other projects here!</a>
            </div>
        </footer>
    )
}