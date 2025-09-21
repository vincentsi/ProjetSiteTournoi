// Debug des variables d'environnement
// console.log("🔍 Variables DB config:");
// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_PORT:", process.env.DB_PORT);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_NAME:", process.env.DB_NAME);

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASS,
  DB: process.env.DB_NAME,
  PORT: parseInt(process.env.DB_PORT),
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // Configuration pour Railway
  ...(process.env.NODE_ENV === "production" && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }),
};
// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "132025",
//   DB: "projetfin",
//   PORT: 3306,
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
//   // ...(process.env.DB_HOST &&
//   //   process.env.DB_HOST !== "localhost" && {
//   //     dialectOptions: {
//   //       ssl: {
//   //         require: true,
//   //         rejectUnauthorized: false,
//   //       },
//   //     },
//   //   }),
// };
