import React, { useState } from 'react';

export default function TablePage() {
    const [data, setData] = useState([
        { id: 1, name: 'Elem 1', value: 10 },
        { id: 2, name: 'Elem 2', value: 20 }
    ]);

    const handleSort = (key) => {
        const sorted = [...data].sort((a, b) => a[key] > b[key] ? 1 : -1);
        setData(sorted);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {Object.keys(data[0]).map(key => (
                            <th key={key} onClick={() => handleSort(key)}>
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr key={row.id}>
                            {Object.values(row).map(val => (
                                <td key={val}>{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
