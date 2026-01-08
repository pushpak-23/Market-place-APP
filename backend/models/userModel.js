const db = require('../config/db');

const User = {
  create: async (email, hashedPassword, role, location) => {
    const [result] = await db.execute(
      'INSERT INTO users (email, password, role, location) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, role, location]
    );
    return result.insertId;
  },

  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }
};

module.exports = User;