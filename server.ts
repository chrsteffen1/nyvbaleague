import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/api/update-data', (req, res) => {
  const newData = req.body;
  // Correctly resolve the path to league-data.json from the project root
  const filePath = path.join(__dirname, '..', 'src', 'data', 'league-data.json');
  fs.writeFile(filePath, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({ message: 'Error saving data.' });
    }
    res.status(200).json({ message: 'Data saved successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
