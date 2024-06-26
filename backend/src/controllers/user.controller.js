const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const generate_Token = require('../config/token.config');

exports.createUser = async (req,res)=>{
    const {emailAddress,  password} = req.body;
    if(!emailAddress || !password){
        console.log("Please provide all the required inputs");
        return;
    }
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User(emailAddress,hashedPassword)
        User.create(user,(err,data)=>{
            if(err){
                console.log(err);
                return res.status(500).send({Failure: err})
            }
            res.status(201).send({Success: data})
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).send({Failure:err});
    }  
}

exports.getAllUsers = async(req,res)=>{
    try {
        User.getAll((err,data)=>{
            if(err){
                res.status(500).send({Failure: err})
                return;
            }
            
            res.status(200).send({Success: data});
        })
    } catch (error) {
        console.log(error);
    }
}

exports.login =  async (req,res)=>{
    const {emailAddress , password} = req.body;
    if(!emailAddress || !password){
        res.status(406).send('Incomplete information')
    }
    try{
        User.login(emailAddress,async (err,data) => {
            if (err) {
                res.status(500).send({ Failure: err });
                return;
            }
            console.log(data)
            const passwordExists = await bcrypt.compare(password,data[0].password);
            if(data.length === 0 || !passwordExists){
                res.status(404).send({Failure: 'Incorrect email address or password'});
                return;
            }
            else{
                generate_Token(data[0].user_ID);
                res.status(200).send({Success : 'User successfully logged in!'})
                return;
            }
        })
    }catch(error){
        console.log(error)
    }
}

exports.getUserById = async(req,res)=>{
    const {id} = req.params;
    try {
        User.getById(id,(err,data)=>{
            if(err){
                if(err.kind === 'NOT_FOUND'){
                    res.status(404).send({Failure:'USER_NOT_FOUND'});
                    return;
                }
                else{
                    res.status(500).send({Failure: 'ERROR_OCCURED',err})
                }
            }
            else{
                res.status(200).send({Success:'USER_FOUND',data});
                return;
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.updateUser = (req,res)=>{
    const {id} = req.params;
    const {emailAddress} = req.body;
    if(!emailAddress){
        res.status(406).send({Warning:"INCOMPLETE_INPUT"});
        console.log("INCOMPLETE_USER_INPUT")
        return;
    }   
    try {    
        const user = {emailAddress}
        User.update(id,user,(err,data)=>{
            if(err){
                if(err.kind==='NOT_FOUND'){
                    res.status(404).send({Failure:'USER_NOT_FOUND'});
                    return
                }
                else{
                    res.status(500).send({Failure:'ERROR_OCCURED',err});
                }
            }
            
            res.status(200).send({Success: 'USER_UPDATED_SUCCESSFULLY',data});
            console.log(data);
        })
    } catch (error) {
        console.log(error);
        return
    }
}