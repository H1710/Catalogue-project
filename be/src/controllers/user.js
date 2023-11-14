const db = require("../models/index");
// const { name, address, random, internet, date } = require('@faker-js/faker');
const { faker } = require("@faker-js/faker");
const Sequelize = require("sequelize");

const Role = db.role;
const User = db.user;
const Order = db.order;
const ServicePackage = db.servicePackage;
class UserController {
  static async createUser(req, res) {
    try {
      let info = {
        name: req.body.name,
        address: req.body.address,
        typeRegister: req.body.type_register,
        email: req.body.email,
        password: req.body.password,
        endDate: req.body.date,
      };
      console.log(info);
      const user = await User.create(info);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await db.user.findByPk(userId);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const newData = {
        name: req.body.name,
        address: req.body.address,
        type_register: req.body.type_register,
        email: req.body.email,
        password: req.body.password,
        end_date: req.body.end_date,
      };

      const user = await db.user.findByPk(userId);
      if (user) {
        await user.update(newData);
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await db.user.findByPk(userId);
      if (user) {
        await user.destroy();
        res.status(204).send();
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async autoCreateUser(req, res) {
    try {
      // const { numOfUser } = req.body;
      // if (!numOfUser) {
      //   res.status(400).json({ message: "Number of user is required." });
      // }
      const countries = [
        "Vietnam",
        "USA",
        "India",
        "France",
        "China",
        "Brazil",
      ];
      const listOfUsers = [];
      for (let index = 0; index < 100; index++) {
        let fakeInfo = {
          name: faker.person.fullName(),
          country: faker.helpers.arrayElement(countries),
          typeRegister: faker.helpers.arrayElement(["Normal", "Google"]),
          email: faker.internet.email(),
          password: faker.internet.password(),
          endDate: faker.date.future(),
          roleId: faker.number.int({ min: 1, max: 4 }),
          createdAt: faker.date.past(),
          updatedAt: faker.date.past(),
        };
        const fakeUser = await User.create(fakeInfo);
        const service = await ServicePackage.findByPk(
          faker.number.int({ min: 1, max: 3 })
        );
        const order = await Order.create();
        await fakeUser.addOrder(order);
        await service.addOrder(order);

        listOfUsers.push({});
      }
      res.status(200).json({ listOfUsers });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }


  static async getUserByYear(req, res) {
    try {
      const year = parseInt(req.params.year, 10);
      console.log(year);

      if (isNaN(year)) {
        res.status(400).send({ message: "Invalid year" });
        return;
      }

      // Tạo một mảng với tất cả các tháng trong năm
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

      // Truy vấn cơ sở dữ liệu để lấy số lượng đăng ký trong từng tháng
      const userRegistrations = await User.findAll({
        attributes: [
          [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month'],
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'registration_count'],
        ],
        where: {
          createdAt: {
            [Sequelize.Op.gte]: new Date(`${year}-01-01`),
            [Sequelize.Op.lte]: new Date(`${year}-12-31`),
          },
        },
        group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))],
        raw: true,
        order: [[Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'ASC']],
      });

      // Truy vấn cơ sở dữ liệu để lấy tổng số lượng đăng ký trong cả năm
      const totalRegistrations = await User.count({
        where: {
          createdAt: {
            [Sequelize.Op.gte]: new Date(`${year}-01-01`),
            [Sequelize.Op.lte]: new Date(`${year}-12-31`),
          },
        },
      });

      // Tạo một Map từ kết quả truy vấn để dễ dàng truy cập thông tin
      const userMap = new Map(userRegistrations.map(registration => [registration.month, registration]));

      // Tạo kết quả cuối cùng với đủ 12 tháng và tổng số lượng đăng ký trong cả năm
      const result = allMonths.map(month => {
        const data = userMap.get(month);
        return {
          year: year,
          month,
          registration_count: data ? data.registration_count : 0,
        };
      });

      res.status(200).json({
        registrations: result,
        total_registrations: totalRegistrations,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }

}

exports.UserController = UserController;
