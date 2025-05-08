
export interface AppSettings {
    datasource: string;
    apiUrl: string;
    timeInterval: number;
    pageSize: number;
}
export const loadAppSettings = async (): Promise<AppSettings> => {
    const res = await fetch('/appsettings.json');

    const data: AppSettings = await res.json();
    return data;

};