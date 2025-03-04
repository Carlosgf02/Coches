const { Sequelize } = require("sequelize");
const { db } = require("../config/config");

const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  port: db.port || 3306,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: console.log,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a la base de datos MySQL");
  } catch (error) {
    console.error("❌ Error de conexión a la base de datos:", error);
  }
})();

module.exports = sequelize;
