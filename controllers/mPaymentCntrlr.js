const axios = require("axios");
const Payments = require("../models/checkoutModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

const PaymentController = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find();

      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("name email");

      if (!user) return res.status(400).json({ msg: "El usuario no existe." });

      const {
        name,
        lastName,
        payer_email,
        personalId,
        phone,
        country,
        state,
        city,
        postalCode,
        address,
        items,
        total,
      } = req.body;

      const { _id} = user;

      const newPayment = new Payments({
        user_id: _id,
        name,
        payer_email,
        lastName,
        personalId,
        phone,
        country,
        state,
        city,
        postalCode,
        items,
        total,
        address,
      });

      items.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });

      await newPayment.save();
      
      console.log(newPayment._id)
      res.json(newPayment._id); 
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPaymentLink: async (req, res) => {
    try {
      
      const { 
        user_id,
        name,
        lastName,
        personalId,
        payer_email,
        phone,
        postalCode,
        address,
        items,
        total,
      } = await Payments.findById(req.params.id);

      const url = "https://api.mercadopago.com/checkout/preferences";

      const body = {
        payer_email: payer_email,
        items: items,
        back_urls: {
          success: "https://www.success.com",
          failure: "http://www.failure.com",
          pending: "http://www.pending.com",
        },
        notification_url: "https://www.your-site.com/ipn",
        payer: {
          phone: {
            number: phone,
            email: payer_email, 
          },
          address: {
            zip_code: postalCode,
            street_name: address,
          },
          identification: {
            number: personalId,
            type: "DNI",
          },
          name: name,
          surname: lastName,
          shipping: {
            mode: "me2", 
            local_pick_up: false, 
            free_shipping: false, 
            free_methods: [], 
          }
        },
        total_amount: total,
      };

      const payment = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      });

      console.log(payment.data)
      return res.json(payment.data);

    } catch (err) {
      return res.status(500).json({ msg: err.response.data });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

module.exports = PaymentController;

// class PaymentController {
//   constructor(subscriptionService) {
//     this.subscriptionService = subscriptionService;
//   }

// async getPaymentInfo(req,res) {
//   try{
//     const checkoutInfo = await this.subscriptionService.getPaymentInfo()
//     console.log(checkoutInfo)
//   } catch (error) {
//     console.log(error);
//   }
// }

//   async getPaymentLink(req, res) {
//     try {
//       const payment = await this.subscriptionService.createPayment();

//       return res.json(payment);
//     } catch (error) {
//       console.log(error);

//       return res
//         .status(500)
//         .json({
//           error: true,
//           msg: "Failed to create Payment",
//         });
//     }
//   }

// }

module.exports = PaymentController;
