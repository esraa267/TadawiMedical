import { useEffect, useState } from "react"
import MedicalService from "../app/services/medicalSevice";
import { MedicalData } from "../app/core/entities/MedicalData";
import TadawiTable from "./TadawiTable";
import Header from "./Header";
const DataPage = () => {
    const [data, setData] = useState([] as MedicalData);
    const [error, setError] = useState('');
    const fetchData = async () => {
        try {

            const result = await MedicalService.getData();
            setData(result);

        } catch (err) {
            setError('error');
        }
    }
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval)
    }, [])
    return <div>
        <Header />

        <TadawiTable sampleData={data} /></div>
}
export default DataPage