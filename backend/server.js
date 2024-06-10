const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const pool = require('./src/config/db.config');
const userRoutes = require('./src/routes/user.routes');
const {specs,swaggerUi} =  require('./swagger');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use('/users',userRoutes);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));

const serverStart = () =>{
    app.listen(process.env.PORT ,()=>{
        console.log('Server running........');
    });
    pool.getConnection((err,connection)=>{
        if(err){
            console.log(err);
        }
        if(connection){
            console.log("DB Connection established");
        }
    })
}
serverStart();

app.get('/',(req,res)=>{
    res.status(200).send("Welcome on our homepage");
})


