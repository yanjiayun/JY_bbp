"use client";
import React, { useEffect, useState } from 'react';
import TimeSeriesChart from './TimeSeriesChart';

const Visualization = () => {
  // State to hold the time series data
  const [data, setData] = useState<Array<{ time: string, value: number, parameter: string }>>([]);
  // State to hold the list of run IDs
  const [runIds, setRunIds] = useState<string[]>([]);
  // State to hold the selected run ID
  const [selectedRunId, setSelectedRunId] = useState<string>('');

  useEffect(() => {
    // Fetch all run IDs on component mount
    fetch('http://localhost:8000/api/runids')
      .then(response => response.json())
      .then(runIdsData => {
        setRunIds(runIdsData);
        if (runIdsData.length > 0) {
          setSelectedRunId(runIdsData[0]); // Default to the first run ID
        }
      })
      .catch(error => console.error('Error fetching runIds:', error));
  }, []);

  useEffect(() => {
    if (selectedRunId) {
      // Fetch data based on the selected run ID
      fetch(`http://localhost:8000/api/data?runId=${selectedRunId}`)
        .then(response => response.json())
        .then(fetchedData => {
          setData(fetchedData);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [selectedRunId]);

  return (
    <>
      <div className='flex mx-auto max-w-screen-2xl w-full mt-24'>
        <label className='my-auto block text-gray-700 text-md md:text-lg font-normal mb-2'>Select Run ID:</label>
        <select 
          value={selectedRunId} 
          onChange={e => setSelectedRunId(e.target.value)} 
          className='ml-4 shadow border rounded w-fit py-2 px-4 text-gray-700 text-md md:text-lg leading-tight focus:outline-none focus:shadow-outline'
        >
          {runIds.map(runId => (
            <option key={runId} value={runId}>{runId}</option>
          ))}
        </select>
      </div>
      <div className='max-w-screen-2xl min-h-[300px] w-full mb-32 mx-auto'>
        <TimeSeriesChart data={data} />
      </div>
    </>
  );
};

export default Visualization;