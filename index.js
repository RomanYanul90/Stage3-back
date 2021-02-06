import express from 'express';
import mongoose from 'mongoose';
import config from './config/default.json';
import advertRoutes from './routes/advert-routes';
import userRoutes from './routes/auth-routes';

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/auth', userRoutes);
app.use('/api/advert', advertRoutes);

const PORT = config.port || 5000;
const { mongoUri } = config;

async function start() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`Server is started on port ${PORT}`);
    });
  } catch (e) {
    console.log('Error: ', e);
    process.exit(1);
  }
}

start();
