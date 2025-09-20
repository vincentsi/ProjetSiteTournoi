// module.exports = {
//   HOST: process.env.MYSQL_HOST || process.env.DB_HOST || "localhost",
//   USER: process.env.MYSQL_USER || process.env.DB_USER || "root",
//   PASSWORD: process.env.MYSQL_PASSWORD || process.env.DB_PASS || "132025",
//   DB: process.env.MYSQL_DATABASE || process.env.DB_NAME || "projetfin",
//   PORT: process.env.MYSQL_PORT || process.env.DB_PORT || 3306,
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
//   // Configuration pour Railway
//   ...(process.env.NODE_ENV === "production" && {
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   }),
// };
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "132025",
  DB: "projetfin",
  PORT: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
