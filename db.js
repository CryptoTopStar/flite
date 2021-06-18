const moment = require("moment");
const mysql = require("mysql2");
const { dbHost, dbPort, dbUser, dbPwd, dbName } = require("./config");

class Db {
  // pool = null;
  constructor() {
    this.pool = mysql.createPool({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPwd,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 100,
      queueLimit: 0,
    });
  }

  execute(query, params, cb) {
    if (!this.pool) return cb("Invalid connection", null);
    this.pool.getConnection((cnn_err, conn) => {
      if (cnn_err) {
        cb(cnn_err, null);
      } else {
        conn.query(query, params, (qErr, results) => {
          this.pool.releaseConnection(conn);
          if (qErr) {
            cb(qErr, null);
          } else {
            cb(null, results);
          }
        });
      }
    });
  }

  saveContactUs(data) {
    const now = moment().utc().format();
    this.execute(
      "INSERT INTO contact_us_queries(name, email, subject, message, created, modified) VALUES(?,?,?,?,?,?)",
      [data.name, data.email, data.subject, data.message, now, now],
      (err, result) => {
        if (err) {
          console.log("Err contact us ", err);
        } else {
          console.log("Contact us saved successfully", result.insertId);
        }
      }
    );
  }
  saveQuoteData(data) {
    const now = moment().utc().format();
    this.execute(
      "INSERT INTO quotation_customers(title, first_name, last_name, email, phone, total_fly_hours_in_year, current_mode_of_travel, created, modified) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        "",
        data.firstName,
        data.lastName,
        data.email,
        data.phoneNo,
        data.flyPrivately,
        data.currentlyTravel,
        now,
        now,
      ],
      (err, result) => {
        if (err) {
          console.log("Err quote data", err);
        } else {
          console.log("Quotation customer saved successfully", result.insertId);
          this.saveQuoteDataDetails(result.insertId, data);
        }
      }
    );
  }

  saveQuoteDataDetails(quoteCustomerId, data) {
    const now = moment().utc().format();
    const quoteData = data.quoteData.map((item) => {
      return [
        quoteCustomerId,
        data.type,
        item.legName,
        item.selectedAircraft,
        item.fromLocation,
        item.toLocation,
        moment(item.date, "DD-MM-YYYY").format("MM-DD-YYYY"),
        item.time,
        item.adults,
        item.children,
        item.infants,
        now,
        now,
      ];
    });

    this.execute(
      `INSERT INTO quotations(quotation_customer_id, type, leg_name, aircraft_size, from_location, to_location, date, time, pax_adult, pax_children, pax_infants, created, modified) VALUES ?`,
      [quoteData],
      (err, result) => {
        if (err) {
          console.log("Err quote details", err);
        } else {
          console.log(
            "Quotation saved for successfully for customer",
            quoteCustomerId,
            result
          );
        }
      }
    );
  }
}

module.exports = new Db();
