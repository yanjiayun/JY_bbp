const { RunClient, RunTimeSeriesData } = require('../models/runModel');

const saveRunData = async (file, pump1, pump2) => {
  const data = [];

  // Parse CSV file
  const results = file.buffer.toString().split('\n');

  // Extract clientNameFull and runIdFull
  const firstLine = results[0].split(',');
  const clientNameFull = firstLine[1].trim(); // Read column B content (ClientABC_R001001: DataLog Param, PV and Units)
  const clientNameAndRunId = clientNameFull.split(':')[0].trim(); // Extract content before the colon (ClientABC_R001001)

  // Extract clientName and runId from clientNameAndRunId
  const clientName = clientNameAndRunId.split('_')[0]; // Extract ClientABC
  const runId = clientNameAndRunId.split('_')[1]; // Extract R001001
  
  // Skip the first three rows of the CSV file
  for (let i = 3; i < results.length; i++) {
    const row = results[i].trim();
    
    // Check for empty rows
    if (!row) {
      console.warn(`Skipping empty row at line ${i + 1}`);
      continue;
    }
    
    const values = row.split(',').filter(value => value.trim() !== ''); // Filter out empty values

    // Check the completeness of each row of data
    if (values.length >= 4) {
      const time = values[0].trim();
      const parameter = values[1].trim();
      const value = values[2].trim();
      const units = values[3].trim();

      // Only process non-empty parameter names
      if (time && parameter && value && units) {
        data.push({
          runId, // Store runId in each data entry
          time,
          parameter: parameter.replace('Pump1', pump1).replace('Pump2', pump2),
          value,
          units,
        });
      } else {
        console.warn(`Missing data in row at line ${i + 1}: ${row}`);
      }
    } else {
      console.warn(`Invalid row format at line ${i + 1}: ${row}`);
    }
  }

  // Check if `runId` already exists
  const existingRun = await RunClient.findOne({ runId });
  if (!existingRun) {
    await RunClient.create({ runId, clientName });
  } else {
    console.log(`RunID ${runId} already exists. Skipping insertion.`);
  }

  // Store time series data in `run_time_series_data` table
  try {
    await RunTimeSeriesData.insertMany(data);
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

module.exports = { saveRunData };