import { useState, useEffect } from "react";
export function useFetchData(products) {
    const [homeData, setHomeData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:8080/${products}`);
                const data = await response.json();
                setHomeData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [endpoint]);
    return { homeData }
}

