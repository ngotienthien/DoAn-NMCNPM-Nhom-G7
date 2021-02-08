const mysql = require("mysql");
const config = require("../config/default.json");

const pool = mysql.createPool(config.mysql);

module.exports = {
  load: function (sql) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (error, results, fields) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },

  add: function (table, entity) {
    return new Promise(function (resolve, reject) {
      const sql = `insert into ${table} set ?`;
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  patch: function (table, entity, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `update ${table} set ? where ?`;
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },

  del: function (table, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `delete from ${table} where ?`;
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },

  UpdateByQuery: function (sql) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (error, results, fields) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },

  // load: function (sql, fn_done, fn_fail) {
  //   pool.query(sql, function (error, results, fields) {
  //     if (error) {
  //       return fn_fail(error);
  //     }

  //     fn_done(results);
  //   });
  // },

  // load: function (sql, fn_done, fn_fail) {
  //   const cn = mysql.createConnection(config.mysql);
  //   cn.connect();
  //   cn.query(sql, function (error, results, fields) {
  //     if (error) {
  //       cn.end();
  //       fn_fail(error);
  //       return;
  //     }
  //     fn_done(results);
  //     cn.end();
  //   });
  // }
};
