const mongoose =  require('mongoose');

const dbconection = async() => {

    try{

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            // useCreatedIndex : true
        })

        console.log('DB online')

    }catch (error){
        console.log(error);

        throw new Error('Error a la hora de inicializar la BD');
    }

}

module.exports = {
    dbconection
}