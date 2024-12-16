import platesServices from "../../services/plates"
import { useEffect } from "react";
import Loading from '../loading/pages'

export default function Plates() {
    const { getAvailablePlates, platesList, platesLoading, refetchPlates } = platesServices()

    useEffect(() => {
        if (refetchPlates) {
            getAvailablePlates()
        }
    }, [refetchPlates]);

    if (platesLoading) {
        return (<Loading />)
    }

    console.log(platesList)

    return (
        <h1>plates</h1>
    )
}