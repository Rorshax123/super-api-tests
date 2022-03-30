import request from "../config/common";
import { expect } from "chai";
import { describe } from "mocha";
import { deleteUser, registerUser } from "../helper/register_helper";
import { createInstallmentTexnomart, createOrder } from "../helper/order_helper";

const phoneNumber = "+998977111714";
const firstName = "test";
const lastName = "test";
const code = "12345";
const productId = 89610;
const productPrice = 2026000;
const productName = "smartfon-samsung-galaxy-a12-332gb-black";
const address = "toshkent yunus obod";
const homeNumber = "8";
const roomNumber = "12";

let USER_TOKEN;

describe("Create order", () => {
  beforeEach("Take a token on every test", async () => {
    await deleteUser();
    const res = await registerUser(phoneNumber, firstName, lastName, code);
    USER_TOKEN = res.body.data.token;
  });

  it("Correct order", async () => {
    const res = await createOrder(
      USER_TOKEN,
      productId,
      address,
      homeNumber,
      roomNumber
    );

    expect(res.body.success).to.be.equal(true);
    expect(res.body.error_code).to.be.equal(0);
    expect(res.body.data.order.id).is.not.null;
    expect(res.body.data.order.order_number).to.not.null;
    expect(res.body.data.order.order_number).to.not.equal("");
    expect(res.body.data.order.first_name).to.be.equal(firstName);
    expect(res.body.data.order.last_name).to.be.equal(lastName);
    expect(res.body.data.order.phone).to.be.equal(phoneNumber.replace("+", ""));
    expect(res.body.data.order.amount).to.be.equal(productPrice);
    expect(res.body.data.order.orderProducts[0].product.id).to.be.equal(
      productId
    );
    expect(res.body.data.order.orderProducts[0].product.slug).to.be.equal(
      productName
    );
    expect(res.body.data.order.orderProducts[0].product.sale_price).to.be.equal(
      productPrice
    );
    expect(res.body.data.order.home_number).to.be.equal(homeNumber);
    expect(res.body.data.order.room_number).to.be.equal(roomNumber);
    expect(res.body.data.order.created_at).to.be.not.null;
    expect(res.body.data.order.created_at).to.be.not.equal("");
    expect(res.body.payment).to.be.not.null;
    expect(res.body.payment).to.be.not.equal("");
  });

  it("Order with out token or illegal token", async () => {
    const res = await createOrder(
      123,
      productId,
      address,
      homeNumber,
      roomNumber
    );
    console.log(res.body);
    expect(res.body.name).to.be.equal("Unauthorized");
    expect(res.body.message).to.be.equal(
      "Your request was made with invalid credentials."
    );
    expect(res.body.status).to.be.equal(401);
  });

  it("Order with out product", async () => {
    const res = await createOrder(
      USER_TOKEN,
      1111111111,
      address,
      homeNumber,
      roomNumber
    );
    expect(true).to.be.equal(false);
  });

  it("Order with out address", async () => {
    const res = await createOrder(
      USER_TOKEN,
      productId,
      "",
      homeNumber,
      roomNumber
    );
    console.log(res.body)
  });
});

describe("Create a texnomart installment", () => {
   beforeEach("Take a token on every test", async () => {
     await deleteUser();
     const res = await registerUser(phoneNumber, firstName, lastName, code);
     USER_TOKEN = res.body.data.token;
   });
   it('Create a correct installment', () => {
      const res = await createInstallmentTexnomart(
        USER_TOKEN,
        productId,
        address,
        homeNumber,
        roomNumber
      );
       expect(res.body.success).to.be.equal(true);
       expect(res.body.error_code).to.be.equal(0);
       expect(res.body.data.order.id).is.not.null;
       expect(res.body.data.order.order_number).to.not.null;
       expect(res.body.data.order.order_number).to.not.equal("");
       expect(res.body.data.order.first_name).to.be.equal(firstName);
       expect(res.body.data.order.last_name).to.be.equal(lastName);
       expect(res.body.data.order.phone).to.be.equal(
         phoneNumber.replace("+", "")
       );
       expect(res.body.data.order.amount).to.be.equal(productPrice);
   })
})
