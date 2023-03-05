import express from "express";
import pgp from "pg-promise";
import { validate } from "./CpfValidator";

const connection = pgp()("postgres://postgres:root@localhost:5432/ordpro_db");

const app = express();
app.use(express.json());

const coupons = [{ id: "VALE20", percentage: 20 }];

app.get("/health", async function (req, res) {
  return res.status(200).json({
    message: "Server is running!",
  });
});
app.post("/checkout", async function (req, res) {
  const isValidCpf = validate(req.body.cpf);
  if (!isValidCpf) {
    res.status(422).json({
      message: "Invalid cpf",
    });
  } else {
    let total = 0;
    for (const item of req.body.items) {
      const [product] = await connection.query(
        "SELECT * FROM ccat.product WHERE id = $1",
        [item.id]
      );
      if (product) {
        total += parseFloat(product?.price) * item.quantity;
      } else {
        return res.status(422).json({
          message: "Product not found",
        });
      }
    }
    if (req.body.coupon) {
      const [coupon] = await connection.query(
        "SELECT * FROM ccat.coupon WHERE code = $1",
        [req.body.coupon]
      );
      if (coupon) {
        total -= (total * coupon?.percentage) / 100;
      }
    }
    res.json({ total });
  }
});
app.listen(3000);
