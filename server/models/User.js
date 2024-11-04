import pool from "../helper/db.js";

const postUser = async(email, hashedPassword) => {
    return pool.query('insert into account (email, password) values ($1, $2) returning *;', 
            [email, hashedPassword])
}

const selectUserByEmail = async(email) => {
    return pool.query("select * from account where email=$1",
            [email])
}

export { postUser, selectUserByEmail }