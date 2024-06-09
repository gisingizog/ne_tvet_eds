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