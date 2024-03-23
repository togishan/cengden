import React, { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch('/api/data')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <div>
            <h1>Flask + React Example</h1>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}

export default App;
