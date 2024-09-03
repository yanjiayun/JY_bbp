const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const multer = require('multer');
const { saveRunData } = require('./controllers/runController');
const { RunTimeSeriesData } = require('./models/runModel');
const connectDB = require('./database');
const port = 8000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // React runs on port 3000
    methods: ["GET", "POST"]
  }
});

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

// When a new runId is added, push a message to clients via WebSocket
app.post('/api/upload', upload.single('file'), async (req, res) => {
  const { file } = req;
  const { pump1, pump2 } = req.body;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    await saveRunData(file, pump1, pump2);
    
    // After successful upload, get all runIds
    const runIds = await RunTimeSeriesData.distinct('runId');
    io.emit('newRunId', runIds); // Send updates to all connected clients

    res.status(200).json({ message: 'File processed and data saved' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const { runId } = req.query; // Get runId from the query parameters

    if (!runId) {
      return res.status(400).json({ message: 'runId query parameter is required' });
    }

    // Check if the runId exists in the database
    const runExists = await RunTimeSeriesData.exists({ runId });

    if (!runExists) {
      return res.status(404).json({ message: `RunId ${runId} not found` });
    }

    // Fetch data from the database where the runId matches the provided runId
    const data = await RunTimeSeriesData.find({ runId });

    const formattedData = data.map(item => ({
      time: item.time,
      value: item.value,
      parameter: item.parameter
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/runids', async (req, res) => {
  try {
    const runIds = await RunTimeSeriesData.distinct('runId');
    res.json(runIds);
  } catch (error) {
    console.error('Error fetching runIds:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});