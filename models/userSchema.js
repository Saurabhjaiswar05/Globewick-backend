import db from "../db.js";

export const createUser = async (user) => {
    const sql = `INSERT INTO users (firstName, lastName, email, countryCode, phoneNumber, password, dateOfBirth, gender) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const { firstName, lastName, email, countryCode, phoneNumber, password, dateOfBirth, gender } = user;
    const [result] = await db.execute(sql, [
        firstName,
        lastName,
        email,
        countryCode,
        phoneNumber,
        password,
        dateOfBirth,
        gender,
    ]);
    return result;
};

export const findUserByEmail = async (email) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
};
