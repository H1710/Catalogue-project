const db = require("../models/index");
const ServicePackage = db.servicePackage;

class servicePackageController {
  static async getServiecePackage(req, res) {
    try {
      if (!ServicePackage) {
        return res.status(500).json({ message: "Failed to load Data!!!" });
      }

      const listServices = await ServicePackage.findAll();
      res.status(200).send({
        services: listServices,
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }

  static async addServiecePackage(req, res) {
    try {
      const { name, price, remain_day, classService } = req.body;
      await ServicePackage.create({
        name,
        price,
        remain_day,
        classService,
      });
      res.status(200).json({ message: "Add package successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
  static async removeServiecePackage(req, res) {
    try {
      const id = req.body.id;

      const pk = await ServicePackage.findByPk(id);

      if (!pk) {
        return res.status(404).json({ message: "Package not found" });
      }
      await pk.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).json({ message: "Remove package successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Can not remove!" });
    }
  }
  static async editServiecePackage(req, res) {
    try {
      const { id, name, price, remain_day, classService } = req.body;

      const pk_edit = await ServicePackage.findByPk(id);
      if (!pk_edit) {
        return res.status(404).json({ message: "Package not found" });
      }

      pk_edit.name = name;
      pk_edit.classService = classService;
      pk_edit.price = price;
      pk_edit.remain_day = remain_day;

      await pk_edit.save();
      return res.status(200).json({ message: "Update package successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Can not edit!" });
    }
  }
}
exports.servicePackageController = servicePackageController;
