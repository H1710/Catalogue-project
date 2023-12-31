const db = require("../models/index");
// const { name, address, random, internet, date } = require('@faker-js/faker');
const { faker } = require("@faker-js/faker");
const Sequelize = require("sequelize");
const cloudinary = require("../utils/cloudinary");

const Role = db.role;
const User = db.user;
const Order = db.order;
const ImageUpload = db.imageUpload;

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
      const user = await db.user.findByPk(userId, {
        attributes: [
          "id",
          "name",
          "optCode",
          "avatar",
          "typeRegister",
          "email",
          "password",
          "endDate",
          "createAt",
          "updateAt",
          "roleId",
        ],
      });
      if (!user) {
        return res.status(400).send({ message: "User not found." });
      }
      return res.status(200).json({ user: user });
    } catch (error) {
      res.status(400).send({ message: "Something went wrong." });
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.body.id;

      const user = await db.user.findByPk(userId);
      if (user) {
        const newData = {
          name: req.body.name || user.dataValues.name,
          email: req.body.email || user.dataValues.email,
          country: req.body.country || user.dataValues.country,
          roleId: parseInt(req.body.role) || user.dataValues.roleId,
          status: req.body.status || user.dataValues.status,
        };

        await user.update(newData);
        res.status(200).send({ message: "Update user successfully" });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await db.user.findByPk(userId);
      if (user && user.roleId != 1) {
        await user.update({
          status: "InActive",
        });
        res.status(200).json({
          message: "Delete user successfully",
        });
      } else {
        res.status(404).json({ message: "Cannot ban this user" });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  static async restoreUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await db.user.findByPk(userId);
      if (user && user.roleId != 1) {
        await user.update({
          status: "Active",
        });
        res.status(200).json({
          message: "Restore status user successfully",
        });
      } else {
        res.status(404).json({ message: "Cannot restore this user" });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
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
          roleId: faker.number.int({ min: 1, max: 2 }),
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
      }
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async getAllUser(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; // Parse the page from the request query or default to page 1
      const perPage = 10; // Number of users to show per page
      const offset = (page - 1) * perPage; // Calculate the offset based on the page

      const userList = await User.findAndCountAll({
        attributes: ["id", "avatar", "name", "email", "country", "status"],
        include: [
          {
            model: Role,
            attributes: ["id", "name"],
          },
          {
            model: Order,
            include: {
              model: ServicePackage,
              attributes: ["name", "remain_day"],
            },
          },
        ],
        limit: perPage,
        offset: offset,
      });

      res.json(userList);
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: "Something went wrong." });
    }
  }

  static async getUserByYear(req, res) {
    try {
      const year = parseInt(req.params.year, 10);

      if (isNaN(year)) {
        res.status(400).send({ message: "Invalid year" });
        return;
      }

      // Tạo một mảng với tất cả các tháng trong năm
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

      // Truy vấn cơ sở dữ liệu để lấy số lượng đăng ký trong từng tháng của năm hiện tại
      const userRegistrations = await User.findAll({
        attributes: [
          [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"],
          [Sequelize.fn("COUNT", Sequelize.col("id")), "registration_count"],
        ],
        where: {
          createdAt: {
            [Sequelize.Op.gte]: new Date(`${year}-01-01`),
            [Sequelize.Op.lte]: new Date(`${year}-12-31`),
          },
        },
        group: [Sequelize.fn("MONTH", Sequelize.col("createdAt"))],
        raw: true,
        order: [[Sequelize.fn("MONTH", Sequelize.col("createdAt")), "ASC"]],
      });

      // Truy vấn cơ sở dữ liệu để lấy tổng số lượng đăng ký trong cả năm hiện tại
      const totalRegistrations = await User.count({
        where: {
          createdAt: {
            [Sequelize.Op.gte]: new Date(`${year}-01-01`),
            [Sequelize.Op.lte]: new Date(`${year}-12-31`),
          },
        },
      });

      // Truy vấn cơ sở dữ liệu để lấy tổng số lượng đăng ký trong cả năm trước đó
      const previousYearTotalRegistrations = await User.count({
        where: {
          createdAt: {
            [Sequelize.Op.gte]: new Date(`${year - 1}-01-01`),
            [Sequelize.Op.lte]: new Date(`${year - 1}-12-31`),
          },
        },
      });

      // Tạo một Map từ kết quả truy vấn để dễ dàng truy cập thông tin
      const userMap = new Map(
        userRegistrations.map((registration) => [
          registration.month,
          registration,
        ])
      );

      // Tạo kết quả cuối cùng với đủ 12 tháng và tổng số lượng đăng ký trong cả năm hiện tại
      const result = allMonths.map((month) => {
        const data = userMap.get(month);
        return {
          year: year,
          month,
          registration: data ? data.registration_count : 0,
        };
      });

      res.status(200).json({
        registrations: result,
        total_registrations: totalRegistrations,
        previous_year_total_registrations: previousYearTotalRegistrations,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async selectPackage(req, res) {
    try {
      const { serviceId, userId } = req.body;
      if (serviceId == null && userId == null) {
        res
          .status(400)
          .json({ message: "The user has not selected a package" });
      } else {
        let info = {
          userId: userId,
          servicePackageId: serviceId,
        };
        const order = await Order.create(info);
        res.status(201).json({
          message: "The user selected a package successfully",
          order: order,
        });
      }
    } catch (error) {
      res.status(400).send({ message: "Something went wrong." });
    }
  }

  static async uploadImageByUser(req, res) {
    try {
      const { userId } = req.body;
      const designImage = req.file;

      if (!designImage) {
        return res.status(400).json({ message: "Image not found" });
      }
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // const data = await uploadImage(
      //   designImage.filename,
      //   designImage.mimetype
      // );

      const result = await cloudinary.uploader.upload(designImage.path, {
        public_id: designImage.originalname,
        resource_type: "auto",
        folder: "noto",
        use_filename: true,
        unique_filename: false,
      });

      await ImageUpload.create({
        userId: userId,
        content: result.url,
      });

      return res.status(200).send({ message: "Upload success" });
    } catch (error) {
      res.status(400).send({ message: "Something went wrong." });
    }
  }

  static async getImageUpload(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const images = await ImageUpload.findAll({
        where: { userId: userId },
        attributes: ["id", "content"],
      });

      return res
        .status(200)
        .send({ message: "Get images success", images: images });
    } catch (error) {
      res.status(400).send({ message: "Something went wrong." });
    }
  }

  static async getListByYear(req, res) {
    try {
      const year = parseInt(req.params.year, 10);
      console.log(year);

      if (isNaN(year)) {
        res.status(400).send({ message: "Invalid year" });
        return;
      }

      const users = await User.findAll({
        where: {
          createdAt: {
            [Sequelize.Op.gte]: new Date(`${year}-01-01`),
            [Sequelize.Op.lte]: new Date(`${year}-12-31`),
          },
        },
      });

      const orders = await Order.findAll({
        where: {
          createdAt: {
            // Assuming Order has a field named orderDate for creation date
            [Sequelize.Op.gte]: new Date(`${year}-01-01`),
            [Sequelize.Op.lte]: new Date(`${year}-12-31`),
          },
        },
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: ServicePackage,
            attributes: ["name", "price"],
          },
        ],
      });

      res.status(200).json({
        users: users,
        orders: orders,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async getListYears(req, res) {
    try {
      // Truy vấn cơ sở dữ liệu để lấy danh sách các năm distinct từ nhỏ đến lớn
      const distinctYears = await User.findAll({
        attributes: [
          [
            Sequelize.fn(
              "DISTINCT",
              Sequelize.fn("YEAR", Sequelize.col("createdAt"))
            ),
            "year",
          ],
        ],
        order: [[Sequelize.fn("YEAR", Sequelize.col("createdAt")), "ASC"]],
        raw: true,
      });

      // Lấy danh sách năm từ kết quả truy vấn
      const yearsList = distinctYears.map((entry) => entry.year);

      res.status(200).json({
        years: yearsList,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
}

exports.UserController = UserController;
