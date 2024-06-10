const pool = require('../config/db.config');

class User {
    constructor(emailAddress, password){
        this.emailAddress = emailAddress,
        this.password = password
    }
}

User.create=(user,result)=>{
    const insertQuery = "INSERT INTO users (email_Address,password) VALUES(?,?)";
    const values = [user.emailAddress,user.password];
    pool.query(insertQuery,values,(err,res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        const createdUser = {
            id: res.insertId,
            emailAddress : user.emailAddress
        }
        result(null,createdUser);
    })    
}

User.getAll = (result)=>{
    const getAllQuery = "SELECT * FROM users";
    pool.query(getAllQuery,(err,res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        
        console.log(res);
        result(null,res);
    })
}

User.getById = (id,result)=>{
    const getByIdQuery = "SELECT * FROM users WHERE user_ID = ?";
    pool.query(getByIdQuery,id,(err,res)=>{
        if(err){
            console.log(err);
            result(err,null)
            return;
        }
        if(res.length === 0){
            result({kind: "NOT_FOUND"},null);
            return
        }
        console.log(res)
        result(null,res);
        return
    })
}

User.update = (id,user, result)=>{
    const updateQuery = "UPDATE users SET email_Address = ? WHERE user_ID= ?";
    pool.query(updateQuery, [user.emailAddress,id],(err,res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return
        }

        else if(res.affectedRows===0){
            result({kind:'NOT_FOUND'},null);
            return
        }
        else{
            const updatedUser = {
                id:res.insertId,
                emailAddress:user.emailAddress
            }
    
            result(null,updatedUser);
            return
        }
        
    })
}
User.login = (emailAddress,result)=>{
    const getQuery = "SELECT * FROM users WHERE email_Address = ?";
    pool.query(getQuery,[emailAddress],(err,res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        result(null,res);
        return
    })
}


module.exports = User;