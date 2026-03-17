import mongoose from "mongoose";

export const connectMongoDB = async (mode) => {
    try {
        const URL_LOCAL = "mongodb://127.0.0.1:27017/backend_76800";
        const URL_ATLAS = "mongodb+srv://sebaacalvoo_db_user:5w53JAogD1tzXMIL@distribuidoradelacosta.fi7qlmn.mongodb.net/";
        const URL = mode === 'local' ? URL_LOCAL : URL_ATLAS;
        await mongoose.connect(URL);
        console.log(`✅ MongoDB conectada correcamente a ${mode === 'local' ? 'Local' : 'Atlas'}`);
    } catch (error) {
        console.error("⚠️ Ocurrio un error al conectar a MongoDb", error);
        process.exit(1);
    }
};
