const express = require('express');
const managedRecord = require('./api/managed-records');

const app = express();

app.use(express.json());
app.use(managedRecord);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
