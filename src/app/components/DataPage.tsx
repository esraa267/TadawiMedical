import { useEffect, useState } from "react"
import MedicalService from "../services/medicalSevice";
import { MedicalData } from "../core/entities/MedicalData";
import TadawiTable from "./TadawiTable";

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
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval)
    }, [])
    return <TadawiTable sampleData={data} />
}
export default DataPage