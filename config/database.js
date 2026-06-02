import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rotulweb';

    await mongoose.connect(mongoUri);

    console.log('✅ MongoDB conectado exitosamente');
    return true;
  } catch (error) {
    console.error('❌ Error conectando MongoDB:', error.message);
    console.log('💡 Tip: Asegúrate de tener MongoDB corriendo o usa MongoDB Atlas');
    console.log('   Para MongoDB local: mongod');
    console.log('   Para MongoDB Atlas: configura MONGODB_URI en .env');
    return false;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB desconectado');
  } catch (error) {
    console.error('Error desconectando MongoDB:', error);
  }
};
