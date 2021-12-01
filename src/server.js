/* eslint-disable no-console */
import app from './app.js';
import './setup.js';

app.listen(process.env.PORT, () => {
  console.clear();
  console.log(`Env: ${process.env.NODE_ENV}`);
  console.log(`server is running on port ${process.env.PORT}`);
});
