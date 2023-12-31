const db = require("../models/index");
const { faker } = require("@faker-js/faker");
const Role = db.role;

class RoleController {
  static async autoCreateRoles(req, res) {
    try {
      const roles = ["Admin", "Customer", "Guest"];

      for (const item of roles) {
        await Role.create({
          name: item,
        });
      }

      return res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error("Error creating roles:", error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
}
exports.RoleController = RoleController;
