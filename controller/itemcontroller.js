const userdatacollection = require("../models/datamodel");

exports.getuseritemsforyearcontroller = async (req, res, next) => {
  try {
    const userid = req.query.id;
    const response = await userdatacollection
      .find({ userid: userid })
      .select("date amount");
    res.status(200).json({ status: true, data: response });
  } catch (err) {
    console.log('User Item for Year Controller');
    console.log(err);
  }
};
exports.getuseritemsforsingleyearcontroller = async (req, res, next) => {
  try {
    const userid = req.query.id;
    const year = req.query.year;
    const newYear = year.substring(1);
    const response = await userdatacollection.find({
      userid: userid,
      $expr: {
        $eq: [{ $year: "$date" }, newYear],
      },
    });
    res.status(200).json({ status: true, data: response });
  } catch (err) {
    console.log('Single Year Controller');
    console.log(err);
  }
};
exports.getuseritemsforsinglemonthcontroller = async (req, res, next) => {
  try {
    const userid = req.query.id;
    const year = req.query.year;
    const month = req.query.month;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const response = await userdatacollection.find({
      userid: userid,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    res.status(200).json({ status: true, data: response });
  } catch (err) {
    console.log("get User Item for Single Month Error");
    console.log(err);
  }
};
exports.getuseritemsforsingleweekcontroller = async (req, res, next) => {
  try {
    const userid = req.query.id;
    const year = req.query.year;
    const month = req.query.month;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const response = await userdatacollection.find({
      userid: userid,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    res.status(200).json({ status: true, data: response });
  } catch (err) {
    console.log(" Single week err");
    console.log(err);
  }
};
exports.getuseritemsdatewisecontroller = async (req, res, next) => {
  try {
    const { userid, date } = req.body;
    const response = await userdatacollection.find({
      userid: userid,
      date: new Date(date),
    });
    res.status(200).json({ status: true, data: response });
  } catch (err) {
    consooe.log(" user Item date Wise Controller");
    console.log(err);
  }
};
exports.postaddnewitemcontroller = async (req, res, next) => {
  try {
    const { userid, title, amount, amounttype, date } = req.body;
    const response = new userdatacollection({
      userid,
      title,
      amount,
      amounttype,
      date: date,
    });
    await response.save();
    res.status(200).json({ status: true, message: "Item Added Successfully" });
  } catch (err) {
    console.log("post add item errr");
    console.log(err);
  }
};

exports.patchitemcontroller = async (req, res, next) => {
  try {
    const { id, title, amount, amounttype, date } = req.body;
    await userdatacollection.findOneAndUpdate(
      { id: id },
      {
        $set: {
          title: title,
          amount: amount,
          amounttype: amounttype,
          date: date,
        },
      }
    );
    res
      .status(200)
      .json({ status: true, message: "Data Updated SuccessFully" });
  } catch (err) {
    console.log("patch item controller");
    console.log(err);
  }
};
