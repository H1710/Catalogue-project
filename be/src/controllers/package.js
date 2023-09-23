const db = require("../models/index");
const Package = db.servicePackage;

class servicePackageController {
    static async addService(req, res) {
        try {
            const { name, price, remain_day} = req.body;

            await Package.create({
                name,
                price,
                remain_day,
            });
            res.status(200).json({ message: 'Add successful!'})
        } catch (error) {
            return res
                .status(500)
                .json({ message: 'Something went wrong!'})
        }
    }
    static async removeService(req, res) {
        try {
            const id = req.body.id;
            
            const pk = await Package.findByPk(id);
            
            if(!pk) {
                return res
                    .status(404)
                    .json({ message: 'Package not found'});
            }
            await pk.destroy({
                where: {
                  id: id
                }
              });
            return res
                    .status(200)
                    .json({ message: 'Removed package!'});
        } catch (error) {
            return res
                .status(500)
                .json({ message: 'Can not remove!'});
        }
    }
    static async editService(req, res) {
        try {
            const id = req.body.id;
            const pk_edit = await Package.findByPk(id);
            if(!pk_edit) {
                return res
                    .status(404)
                    .json({ message: 'Package not found'});
            }

            const { name, price, remain_day } = req.body;
            pk_edit.name = name;
            pk_edit.price = price;
            pk_edit.remain_day = remain_day;

            await pk_edit.save();
            return res
                .status(200)
                .json({ message: 'Edited!'});
        } catch (error) {
            return res
                .status(500)
                .json({ message: 'Can not edit!'});
        }
    }
    
}

exports.servicePackageController = servicePackageController;