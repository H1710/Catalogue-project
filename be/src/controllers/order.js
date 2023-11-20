const db = require("../models/index");
const Order = db.order;
const User = db.user;
const { faker } = require("@faker-js/faker");
const seq = require("../db/dbConnection");
const ServicePackage = db.servicePackage;
const Sequelize = require("sequelize");

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

  static async getOrderByYear(req, res) {
    try {
      const year = parseInt(req.params.year, 10);
      console.log(year);

      if (isNaN(year)) {
        res.status(400).send({ message: "Invalid year" });
        return;
      }

      // Truy vấn cơ sở dữ liệu cho năm hiện tại
      const ordersCurrentYear = await Order.findAll({
        attributes: [
          [Sequelize.literal("YEAR(createdAt)"), "year"],
          [Sequelize.literal("MONTH(createdAt)"), "month"],
          [Sequelize.literal("COUNT(*)"), "order_count"],
          [Sequelize.literal("SUM(price)"), "monthly_revenue"],
        ],
        include: [
          {
            model: ServicePackage,
            attributes: [],
          },
        ],
        where: {
          createdAt: {
            [Sequelize.Op.between]: [`${year}-01-01`, `${year}-12-31`],
          },
        },
        group: [
          Sequelize.literal("YEAR(createdAt)"),
          Sequelize.literal("MONTH(createdAt)"),
        ],
        order: [
          Sequelize.literal("YEAR(createdAt)"),
          Sequelize.literal("MONTH(createdAt)"),
        ],
        raw: true,
      });

      // Truy vấn cơ sở dữ liệu cho năm trước đó
      const ordersPreviousYear = await Order.findAll({
        attributes: [
          [Sequelize.literal("YEAR(createdAt)"), "year"],
          [Sequelize.literal("MONTH(createdAt)"), "month"],
          [Sequelize.literal("COUNT(*)"), "order_count"],
          [Sequelize.literal("SUM(price)"), "monthly_revenue"],
        ],
        include: [
          {
            model: ServicePackage,
            attributes: [],
          },
        ],
        where: {
          createdAt: {
            [Sequelize.Op.between]: [`${year - 1}-01-01`, `${year - 1}-12-31`],
          },
        },
        group: [
          Sequelize.literal("YEAR(createdAt)"),
          Sequelize.literal("MONTH(createdAt)"),
        ],
        order: [
          Sequelize.literal("YEAR(createdAt)"),
          Sequelize.literal("MONTH(createdAt)"),
        ],
        raw: true,
      });

      // Tổng số đơn đặt hàng cho năm hiện tại
      const totalOrdersCurrentYear = await Order.count({
        where: {
          createdAt: {
            [Sequelize.Op.between]: [`${year}-01-01`, `${year}-12-31`],
          },
        },
      });

      // Tổng số đơn đặt hàng cho năm trước đó
      const totalOrdersPreviousYear = await Order.count({
        where: {
          createdAt: {
            [Sequelize.Op.between]: [`${year - 1}-01-01`, `${year - 1}-12-31`],
          },
        },
      });

      // Tổng doanh thu hàng năm
      const yearlyRevenueCurrentYear = ordersCurrentYear.reduce(
        (acc, order) => acc + parseFloat(order.monthly_revenue),
        0
      );
      const yearlyRevenuePreviousYear = ordersPreviousYear.reduce(
        (acc, order) => acc + parseFloat(order.monthly_revenue),
        0
      );

      // Tạo mảng kết quả với tất cả các tháng và gán giá trị 0 cho những tháng không có dữ liệu
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
      const result = allMonths.map((month) => {
        const key = `${year}-${String(month).padStart(2, "0")}`;
        const dataCurrentYear = ordersCurrentYear.find(
          (order) => order.year === year && order.month === month
        );
        const dataPreviousYear = ordersPreviousYear.find(
          (order) => order.year === year - 1 && order.month === month
        );

        if (dataCurrentYear) {
          return dataCurrentYear;
        } else if (dataPreviousYear) {
          return dataPreviousYear;
        } else {
          return { year, month, order_count: 0, monthly_revenue: 0 };
        }
      });

      res.status(200).json({
        orders: result,
        total_orders_current_year: totalOrdersCurrentYear,
        total_orders_previous_year: totalOrdersPreviousYear,
        yearly_revenue_current_year: yearlyRevenueCurrentYear,
        yearly_revenue_previous_year: yearlyRevenuePreviousYear,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async getAllOrder(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; // Parse the page from the request query or default to page 1
      const perPage = 10; // Number of users to show per page
      const offset = (page - 1) * perPage; // Calculate the offset based on the page

      const orders = await Order.findAndCountAll({
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
        limit: perPage,
        offset: offset,
      });
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong!" });
    }
  }
  static async getHistoricalOrder(req, res) {
    try {
      const { userId } = req.query;
      if (userId == null) {
        return res.status(400).json("User Id is null");
      } else {
        const query =
          'SELECT DISTINCT s.id, s.name, s.price, s.remain_day, s.classService, o.createdAt ' +
          'FROM catalogue_project.orders o ' +
          'JOIN catalogue_project.service_packages s ' +
          'ON o.servicePackageId = s.id ' +
          'WHERE o.userId = ' + userId;
        const result = await seq.query(query, { raw: true });

        if (result.length >= 1) {
          // Use the first array from the result
          return res.status(200).json({ result: result[0] });
        } else {
          // Handle the case when no results are found
          return res.status(200).json({ result: [] });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
}

exports.OrderController = OrderController;
