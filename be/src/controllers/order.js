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
      for (let index = 0; index < numOfPackage; index++) {
        const randomUser = userList[Math.floor(Math.random() * userList.length)];
        const existingOrder = await Order.findOne({
          where: {
            userId: randomUser.id,
            servicePackageId: faker.number.int({ min: 1, max: 4 })
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
}

exports.OrderController = OrderController;
