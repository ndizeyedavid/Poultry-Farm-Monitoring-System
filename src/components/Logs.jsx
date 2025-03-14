import React, { useState } from 'react'
import Title from './Title'

export default function Logs({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

    return (
        <div className="h-full bg-white artboard rounded-xl px-7">
            <Title />
            <h3 className="text-3xl font-bold ml-7">Sensor logs</h3>

            <div className="mt-4 overflow-x-auto">
                <table className="table w-full table-zebra">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Temperature</th>
                            <th>Humidity</th>
                            <th>Gas</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map((item, index) => (
                            <tr key={index + 1}>
                                <td>{item.id}</td>
                                <td>{item.temperature}°C</td>
                                <td>{item.humidity}%</td>
                                <td>{item.gaz}</td>
                                <td>{new Date(item.added_date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4 mb-4">
                <div className="btn-group">
                    <button
                        className="btn btn-sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    <button className="btn btn-sm">Page {currentPage}</button>
                    <button
                        className="btn btn-sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>
            </div>
        </div>
    )
}
