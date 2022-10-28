mysql = require("mysql2");
const { getSQLConnection } = require("../../app.js");

// get all bookings from SQL
const getBookings = async (req, res) => {
  const SQLConnection = getSQLConnection();

  SQLConnection.query(
    "SELECT * FROM booking b INNER JOIN user u ON b.user_number = u.user_number",
    (error, results) => {
      if (error) throw error;
      console.log(results, "i am result");
      res.status(200).json(results);
    }
  );
};

// //! get booking by date

const getBookingByDate = async (req, res) => {
  const date = req.params.date;
  const SQLConnection = getSQLConnection();
  console.log("booking date: ", date);

  SQLConnection.query(
    `SELECT b.deskID, b._id, u.userName FROM booking b INNER JOIN user u ON b.user_number = u.user_number WHERE b.date = '${date}'`,
    (error, results) => {
      if (error) throw error;
      console.log(results, "i am result");
      if (!results) {
        return res.status(400).json({ error: "No such desk booking" });
      } else {
        res.status(200).json(results);
      }
    }
  );
};

// //!  create desk booking
const createBooking = async (req, res) => {
  const { deskID, date, userName } = req.body;
  const SQLConnection = getSQLConnection();

  //regex to validate date - stretch goal

  /////////////////////////////
  // if no user created it will return
  // const user = await User.findOne({ userName });
  // if (!user) {
  //   return res.status(400).json({ error: "Not a valid User account" });
  // }

  let user_number = 0;

  let booking = { deskID, userName };
  booking.deskID = deskID;
  booking.userName = userName;

  // checking the date
  SQLConnection.query(
    `SELECT date FROM booked_date WHERE date = '${date}'`,
    (error, results) => {
      if (error) throw error;
      console.log(error, "i am error");
      console.log(results, "i am date result");

      const continueBooking = () => {
        // get userName
        SQLConnection.query(
          `SELECT user_number FROM user WHERE userName = '${userName}' `,
          (error, results) => {
            if (error) throw error;
            console.log(error, "i am error");
            console.log(results, "i am user result 1");
            // console.log(results[0].user_number, "results[0].user_number");

            const createBooking = () => {
              // add booking to booking table
              SQLConnection.query(
                `INSERT INTO booking (date, user_number, deskID) VALUES ('${date}', ${user_number}, ${deskID})`,
                (error, results) => {
                  if (error) throw error;
                  console.log(results, "i am booking result");
                  if (results) {
                    res.status(200).json(results);
                  }
                }
              );
            };

            if (results[0] === undefined) {
              // adding a user to user table
              SQLConnection.query(
                `INSERT INTO user (userName) VALUES ('${userName}')`,
                // Insert does not include it's created row in its result so need to perform a select query again to get it
                (error, results) => {
                  if (error) throw error;

                  SQLConnection.query(
                    `SELECT user_number FROM user WHERE userName = '${userName}' `,
                    (error, results) => {
                      if (error) throw error;
                      console.log(error, "i am error");
                      console.log(results, "i am user result 2");
                      user_number = results[0].user_number;
                      createBooking();
                    }
                  );
                }
              );
            } else {
              console.log(results, "i am user result 3");
              user_number = results[0].user_number;
              createBooking();
            }
            console.log(user_number, "user_number!!!!!!!");
          }
        );
      };

      if (results[0] === undefined) {
        // adding booked date to booking
        SQLConnection.query(
          `INSERT INTO booked_date (date, total_bookings) VALUES ('${date}', 0)`,
          (error, results) => {
            if (error) throw error;
            console.log(results, "i am date result");
            continueBooking();
          }
        );
      } else {
        continueBooking();
      }
    }
  );
};

// // //!  delete desk booking desk id & date

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;
  const SQLConnection = getSQLConnection();

  SQLConnection.query(
    `DELETE FROM booking WHERE _id = ${id}`,
    (error, results) => {
      if (error) throw error;
      console.log(error, "i am error");
      console.log(id, "i am id");
      res.status(200).json();
    }
  );
};

module.exports = {
  createBooking,
  getBookings,
  deleteBooking,
  //getBookingByID,
  getBookingByDate,
};

// WE NEED to :
// create a user, desk, and booking
// only a user can create a booking
//if your another user it will say the desk is already booked
//if a non valid user tries to book it throws error of not valid user

// catch errors for desks not in db && user - cant create that booking

//delete based on desk id and date if the user exists ?
