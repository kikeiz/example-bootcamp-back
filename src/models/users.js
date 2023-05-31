// conexión a BD
const startConnection = require('../config/connectiondb');
const bcrypt = require("bcrypt");
const tokenGenerator = require("../utils/tokenGenerator"); 
class User {
    
    constructor(
        
        user_name = null,
        password = null,
        email = null,
        user_id = null,

        ){
            this.user_name = user_name,
            this.password = password,
            this.email = email,
            this.user_id = user_id

        }
    }


class UserManager {

   static async getOnlyUser(user_id){
        const BDClient = startConnection();
        const queryresponse = await BDClient.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        BDClient.end();
        console.log(queryresponse)
            return queryresponse.rows;
        };
        
        static async getAllUser(){
            const BDClient =  startConnection();
            const queryresponse = await BDClient.query("SELECT * FROM users");
            BDClient.end();
            console.log(queryresponse)
            return queryresponse.rows;
        };


        static async updateUser(newUser){
            const BDClient =  startConnection();
            const queryresponse = await BDClient.query('UPDATE users SET user_name= $1, email= $2, password= $3 WHERE user_id = $4 RETURNING *',
            [newUser.user_name, newUser.email, newUser.password, newUser.user_id]);
            BDClient.end();
            console.log(queryresponse)
            if (!queryresponse) {
                return null;
              }
              return queryresponse;
            }
        
    

        
        static async registerUser(newUser){
            const BDClient =  startConnection();
            
            const { user_name, email, password } = newUser;
            
            try {
                const data = await BDClient.query(`SELECT * FROM users WHERE email= $1;`, [email]);
                const arr = data.rows;
                
                if (arr.length != 0) {
                    return ({
                        error: "Email ya registrado",  
                    });
                } else {
                    const hash = await bcrypt.hash(password, 10) 

                    if ("" == hash){ 
                        return({
                            error: "Error en el servidor",
                        });
                    }

                    const user = new User (user_name,hash, email);
                    
                    const insertedUser = await BDClient.query(`INSERT INTO users (user_name, email, password) VALUES ($1,$2,$3) RETURNING *;`,
                    [user.user_name, user.email, user.password])
                    
                    if ('error' in insertedUser) {
                        console.error(insertedUser);
                        return({
                            error: "Database error when inserting the user"
                        })
                    }
                    
                    else {
                        const token = tokenGenerator(user.email);
                                                 
                        return({
                            token: token,
                            user: insertedUser.rows[0],
                        });
                        
                    }
                    
                }  
            }
            catch (err) {
                console.log(err);
                return({
                    error: "Database error while registring user!",
                });
            };
            
        };
    }
    
    module.exports = { User, UserManager };
    