const db = require("../models/index");
const servicepackage = db.servicePackage;


class servicePackage {
    static async getServiecePackage(req, res) {
        try {
            if (!servicepackage) {
                return res
                    .status(500)
                    .json({ message: 'Failed to load Data!!!' })
            }

            const listServices = await servicepackage.findAll();
            res.status(200).send({
                servieces: listServices
            })
        } catch (error) {
            console.log(error);
        }
    }

}
exports.servicePackage = servicePackage;