import React, { useState, useEffect } from "react";

function Flags() {
    const [countries, setCountries] = useState([]);

    // Fetch countries data from the API
    useEffect(() => {
        fetch("https://xcountries-backend.azurewebsites.net/all")
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .catch((error) => console.error("Error fetching countries:", error));
    }, []); // Empty array ensures the effect runs only once on mount

    return (
        <div>
            <h1>Countries and Flags</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {countries.map((country) => (
                    <div key={country.name} style={{ margin: "20px" }}>
                        <img
                            src={country.flag}
                            alt={country.name}
                            style={{ width: "100px", height: "60px", objectFit: "cover" }}
                        />
                        <p>{country.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Flags;
