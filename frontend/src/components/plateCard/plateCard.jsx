import styles from './plateCard.module.css'

export default function PlateCard({ plateData }) {
    return (
        <>
            <div className={styles.cardContainer}>
                <img src={plateData.imgUrl} alt="" />
                <div className={styles.cardContent}>
                    <h4>{plateData.name}</h4>
                    <h4 className={styles.price}>$ {plateData.price}</h4>
                </div>
            </div>
        </>
    )
}