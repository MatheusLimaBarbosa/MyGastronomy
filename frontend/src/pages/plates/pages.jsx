import platesServices from "../../services/plates"
import { useEffect, useState } from "react";
import Loading from '../loading/pages'
import PlateCard from "../../components/plateCard/plateCard";
import styles from './page.module.css'
import PlatePopup from "../../components/platePopup/platePopup";
import { useCartContext } from "../../contexts/useCartContext";

export default function Plates() {
    const { getAvailablePlates, platesList, platesLoading, refetchPlates } = platesServices()
    const [plateSelected, setPlateSelected] = useState(null)
    const { addToCart } = useCartContext()

    useEffect(() => {
        if (refetchPlates) {
            getAvailablePlates()
        }
    }, [refetchPlates]);

    const handlePlateSelected = (plate) => {
        setPlateSelected(plate)
    }

    const handleClosePopup = () => {
        setPlateSelected(null)
    }

    const handleAddToCart = (itemToAdd) => {
        addToCart(itemToAdd)
        handleClosePopup()
    }

    if (platesLoading) {
        return (<Loading />)
    }

    console.log(platesList)

    return (
        <>
            <div>
                {platesList.map((plate) => (
                    <div className={styles.cardContainer} key={plate._id} onClick={() => { handlePlateSelected(plate) }}>
                        <PlateCard plateData={plate}/>
                    </div>
                ))}
            </div>
            
            {plateSelected && (
                <PlatePopup plateData={plateSelected} 
                onClose={handleClosePopup}
                onAddToCart={handleAddToCart}
                />
            )}
        </>
    )
}