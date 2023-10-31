const db = require("../models/index");
const Order = db.order;
const User = db.user;
const { faker } = require("@faker-js/faker");
const seq = require("../db/dbConnection");
const ServicePackage = db.servicePackage;

class OrderController {
  static async addOrder(req, res) {
    try {
      const { userId, packageId } = req.body;

      await Order.create({
        userId: userId,
        servicePackageId: packageId,
      });

      return res.status(200).send({
        message: "Add Success!!!",
      });
    } catch (error) {
      return res.status(500).send({
        message: "Add failed!!!",
      });
    }
  }

  static async autoCreateOrder(req, res) {
    try {
      const { numOfPackage } = req.body;
      if (!numOfPackage) {
        res
          .status(400)
          .json({ message: "Number of service package is required." });
      }
      const listOfPackage = [];
      const userList = await User.findAll({ attributes: ["id"] });
      if (userList.length === 0) {
        return res.status(400).json({ message: "No users found." });
      }
      for (let index = 0; index < numOfPackage; index++) {
        const randomUser =
          userList[Math.floor(Math.random() * userList.length)];
        console.log(randomUser.id);
        let fakeInfo = {
          userId: randomUser.id,
          servicePackageId: faker.number.int({ min: 1, max: 4 }),
          createdAt: faker.date.past(),
          updatedAt: faker.date.past(),
        };
        const fakeOrder = await Order.create(fakeInfo);
        listOfPackage.push(fakeOrder);
      }
      res.status(200).json({ listOfPackage });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }

  static async getMonthlyRevenue(req, res) {
    try {
      const monthlyData = [];
      const year = req.body.year;
      const monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      for (let index = 1; index <= 12; index++) {
        const query =
          "select sum(total) as totalRevenue, sum(numOfPurchase) as quantity " +
          "from (" +
          "select sum(numOfPurchase) as numOfPurchase, sum(case when servicePackageId = 1 then numOfPurchase * (select price from catalogue_project.service_packages where id = 1) " +
          "when servicePackageId = 2 then numOfPurchase * (select price from catalogue_project.service_packages where id = 2) " +
          "when servicePackageId = 3 then numOfPurchase * (select price from catalogue_project.service_packages where id = 3) " +
          "when servicePackageId = 4 then numOfPurchase * (select price from catalogue_project.service_packages where id = 4) " +
          " else 0 end) as total " +
          "from (" +
          "select servicePackageId, count(servicePackageId) as numOfPurchase " +
          "from catalogue_project.orders " +
          "where year(createdAt) = " +
          year +
          " and month(createdAt) = " +
          index +
          " group by servicePackageId" +
          ") as subquery " +
          "join catalogue_project.service_packages as sp " +
          "on subquery.servicePackageId = sp.id " +
          "group by servicePackageId, numOfPurchase" +
          ") as subquery2";
        const result = await seq.query(query);
        monthlyData.push({
          monthname: monthName[index - 1],
          result: result[0],
        });
      }
      return res.status(200).json({ monthlyData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }

  static async getYearlyRevenue(req, res) {
    try {
      const yearlyData = [];
      const yearName = [2023, 2024, 2025, 2026];
      for (let index = 0; index < yearName.length; index++) {
        const query =
          "select sum(total) as totalRevenue, sum(numOfPurchase) as quantity " +
          "from (" +
          "select sum(numOfPurchase) as numOfPurchase, sum(case when servicePackageId = 1 then numOfPurchase * (select price from catalogue_project.service_packages where id = 1) " +
          "when servicePackageId = 2 then numOfPurchase * (select price from catalogue_project.service_packages where id = 2) " +
          "when servicePackageId = 3 then numOfPurchase * (select price from catalogue_project.service_packages where id = 3) " +
          "when servicePackageId = 4 then numOfPurchase * (select price from catalogue_project.service_packages where id = 4) " +
          "else 0 end) as total " +
          "from (" +
          "select servicePackageId, count(servicePackageId) as numOfPurchase " +
          "from catalogue_project.orders " +
          "where year(createdAt) = " +
          yearName[index] +
          " group by servicePackageId" +
          ") as subquery " +
          "join catalogue_project.service_packages as sp " +
          "on subquery.servicePackageId = sp.id " +
          "group by servicePackageId, numOfPurchase" +
          ") as subquery2";
        const result = await seq.query(query);
        yearlyData.push({ yearName: yearName[index], result: result[0] });
      }
      return res.status(200).json({ yearlyData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }

  static async getAllOrder(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; // Parse the page from the request query or default to page 1
      const perPage = 7; // Number of users to show per page
      const offset = (page - 1) * perPage; // Calculate the offset based on the page

      const orders = await Order.findAll({
        attributes: ["id", "createdAt", "updatedAt"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
          {
            model: ServicePackage,
            attributes: ["name", "price"],
          },
        ],
        limit: perPage, // Limit the number of results per page
        offset: offset, // Offset for pagination
      });
      res.status(200).json({
        orders: orders,
      });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong!" });
    }
  }
}

exports.OrderController = OrderController;
