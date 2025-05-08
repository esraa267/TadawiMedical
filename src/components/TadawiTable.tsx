import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import { AppSettings, loadAppSettings } from "../config";
import { MedicalData } from "../app/core/entities/MedicalData";

const TadawiTable = ({ sampleData }: { sampleData: MedicalData }) => {
  const [appSettings, setAppSettings] = useState<AppSettings>({} as AppSettings);
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef<any>(null);

  const pagedData = sampleData.slice(
    (currentPage - 1) * appSettings.pageSize,
    currentPage * appSettings.pageSize
  );

  const getAppSettings = async () => {
    const data = await loadAppSettings();
    setAppSettings(data);
  };

  useEffect(() => {
    getAppSettings();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-md font-sans">
      <table className="w-100 border-secondary text-center table-bordered dashed-border">
        <thead className="bg-primary text-white p-2" style={{ fontSize: "20px" }}>
          <tr>
            <th className="p-2 m-1"><p>N</p><p>م</p></th>
            <th className="p-2"><p>File Number</p><p>رقم الملف</p></th>
            <th className="p-2"><p>Attendance</p><p>الحضور</p></th>
            <th className="p-2"><p>Insurance Company</p><p>شركة التأمين</p></th>
            <th className="p-2"><p>Time</p><p>الوقت</p></th>
            <th className="p-2"><p>Status</p><p>الحالة</p></th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map((row, idx) => (
            <tr key={idx}>
              <td className="p-2">{(currentPage - 1) * appSettings.pageSize + idx + 1}</td>
              <td className="p-2">{row.patient_file_no}</td>
              <td className="p-2">{`${row.attendance_en} / ${row.attendance_ar}`}</td>
              <td className="p-2">{`${row.description_en} / ${row.description_ar}`}</td>
              <td className="p-2">{row.trx_date}</td>
              <td className="p-2">{`${row.status_en} / ${row.status_ar}`}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        ref={ref}
        totalItems={sampleData}
        pageSize={appSettings.pageSize}
        timeInterval={appSettings.timeInterval}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
export default TadawiTable;


