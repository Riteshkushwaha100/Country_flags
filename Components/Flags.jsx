import React, { useState, useEffect } from "react";

function Flags() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch countries data from the API
    useEffect(() => {
        fetch("https://xcountries-backend.azurewebsites.net/all")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setCountries(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error); // Updated to match Cypress test expectation
                setError("Failed to load countries. Please try again later.");
                setLoading(false);
            });
    }, []); // Empty array ensures the effect runs only once on mount

    return (
        <div>
            <h1>Countries and Flags</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
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
