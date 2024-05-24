import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, setData, loading, error, fetchData };
};

export default useFetch;
