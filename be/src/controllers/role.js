const db = require("../models/index");
const { faker } = require("@faker-js/faker");
const Role = db.role;

class RoleController {
  static async autoCreateRoles(req, res) {
    try {
      const roles = ["Admin", "Customer", "Guest", "Designer"];
      roles.forEach(async (item) => {
        await Role.create({
          name: item,
        });
      });
      return res.status(200).json({ message: "Sucesss" });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
}
exports.RoleController = RoleController;
