import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        const URL = "mongodb://127.0.0.1:27017";
        await mongoose.connect(`${URL}/backend_76800`);
        console.log(`✅ MongoDB conectada correcamente a ${URL}`);
    } catch (error) {
        console.error("⚠️ Ocurrio un error al conectar a MongoDb", error);
        process.exit(1);
    }
};
