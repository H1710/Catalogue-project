const db = require("../models/index");
const order = db.order;



class Order {

    static async addOrder(req, res) {
        try {
            const userID = req.body.userId;
            const serviceID = req.body.servicePackageId;

            console.log("userID: " + userID);
            console.log("serviceID: " + serviceID);
            // const currentDate = new Date();
            // const purchaseDate = currentDate.getDate();
            const purchaseDate = new Date();


            const newOrder = await Order.create({ purchase_date: purchaseDate });
            await newOrder.setUser(userID);
            await newOrder.setServicePackage(serviceID);

            res.status(200).send({
                message: "Add Success!!!"
            })


        } catch (error) {
            res.status(500).send({
                message: "Add failed!!!"
            });
        }
    }
}


exports.Order = Order;
