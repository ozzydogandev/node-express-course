require('dotenv').config();
const express = require('express');
const connectToDatabase = require('./db/connect');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API');
});

app.use('/api/v1/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const startApp = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

startApp();
