const db = require("../models/index");
const Order = db.order;
const User = db.user;
const { faker } = require('@faker-js/faker');
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
        res.status(400).json({ message: 'Number of service package is required.' });
      }
      const listOfPackage = [];
      const userList = await User.findAll({ attributes: ['id'] });
      if (userList.length === 0) {
        return res.status(400).json({ message: 'No users found.' });
      }
      const packageIds = [1, 2, 3, 4];
      const randomPackageId = packageIds[Math.floor(Math.random() * packageIds.length)];

      for (let index = 0; index < numOfPackage; index++) {
        const randomUser = userList[Math.floor(Math.random() * userList.length)];
        const existingOrder = await Order.findOne({
          where: {
            userId: randomUser.id,
            servicePackageId: faker.number.int({ min: 1, max: 4 })
            // faker.number.int({ min: 1, max: 4 })
          }
        })
        if (!existingOrder) {
          let fakeInfo = {
            userId: randomUser.id,
            servicePackageId: faker.number.int({ min: 1, max: 4 }),
            createdAt: faker.date.past(),
            updatedAt: faker.date.past(),
          }
          const fakeOrder = await Order.create(fakeInfo);
          listOfPackage.push(fakeOrder);
        }
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
      const monthName = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
      for (let index = 1; index <= 12; index++) {
        const query = 'select servicePackageId, count(servicePackageId) as quantity '
        +'from catalogue_project.orders '
        +'where month(createdAt) = '
        + index
        +' and year(createdAt) = '
        + year
        +' group by servicePackageId';
        const result = await seq.query(query);
        monthlyData.push({ monthname:  monthName[index-1], result: result[0]});
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
        const query = 'select servicePackageId, count(servicePackageId) as quantity '
        +'from catalogue_project.orders '
        +'where year(createdAt) = '
        + yearName[index]
        +' group by servicePackageId';
        const result = await seq.query(query);
        yearlyData.push({ yearName:  yearName[index], result: result[0]});
      }
      return res.status(200).json({ yearlyData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
}

exports.OrderController = OrderController;
