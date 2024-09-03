const mongoose = require('mongoose');

const runClientSchema = new mongoose.Schema({
  runId: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
});

const runTimeSeriesDataSchema = new mongoose.Schema({
  runId: { type: String, required: true },
  time: { type: String, required: true },
  parameter: { type: String, required: true },
  value: { type: String, required: true },
  units: { type: String, required: true },
});

const RunClient = mongoose.model('RunClient', runClientSchema);
const RunTimeSeriesData = mongoose.model('RunTimeSeriesData', runTimeSeriesDataSchema);

module.exports = { RunClient, RunTimeSeriesData };