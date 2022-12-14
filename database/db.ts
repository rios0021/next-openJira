import mongoose from 'mongoose';


// 0 = Disconnected
// 1 = Connected
// 2 = Connecting
// 3 = Disconnecting

const mongoConnection = {
    isConnected: 0
}

export const connect = async() => {
    if (mongoConnection.isConnected){
        return;
    }

    if(mongoose.connections.length > 0 ){
        mongoConnection.isConnected = mongoose.connections[0].readyState;
        if(mongoConnection.isConnected === 1){
            console.log('Using previous connection')
            return;
        }
        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || '');
    mongoConnection.isConnected = 1;
    console.log('Conectado a MongoDB:', process.env.MONGO_URL)
}

export const disconnect = async() => {
    if(process.env.NODE_ENV ==='development') return;
    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log('Disconnected from MongoDB');
}