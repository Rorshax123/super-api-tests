import request from "../config/common";
export const createOrder = async (
  userToken,
  product_id,
  address,
  homeNumber,
  roomNumber
) => {
  //данные заказа
  const orderData = {
    sposob_polucheniya: 2,
    is_own: true,
    address_dostavki: address,
    home_number: homeNumber,
    room_number: roomNumber,
    sklad_id: 123,
    data: "8.07.2021",
    time: "10:00 - 20:00",
    bonus: 12345,
    card: "8600123412341234",
    payment_method: "payme",
    payment_type: 1,
    comment: "komment uchun",
    amount: 5000000,
    other_user_fullname: "Axnedov Isxoqjon",
    other_user_phone: "+998966666666",
    delivery: {
      type: "1",
      region: {
        value: 3,
      },
      city: {
        value: 19688582524,
      },
      service_pay_type: 1,
      user_comment: {
        value: "dpd comment",
      },
    },
    products: [
      {
        id: product_id,
        quantity: 1,
      },
    ],
  };
  //Создание заказа
  const res = await request
    .post("order/create")
    .send(orderData)
    .set("token", userToken);
  return res;
};

export const createInstallmentTexnomart = async (
  userToken,
  productId,
  address,
  homeNumber,
  roomNumber
) => {
  //Данные заказа
  const data = {
    payment_method: "rassrochka",
    loan: {
      type: 1,
      duration: 12,
    },
    sposob_polucheniya: 2,
    is_own: 1,
    other_user_fullname: "Murodjon Jo'rayev",
    other_user_phone: "+998966666666",
    address_dostavki: address,
    home_number: homeNumber,
    room_number: roomNumber,
    delivery_date: "8.07.2021",
    delivery_time: "10:00 - 20:00",
    passport: "asdasd",
    registration: "asdasd",
    selfie: "asdasd",
    products: [
      {
        id: productId,
        price: 1685000,
        quantity: 1,
      },
    ],
  };

  const res = await request
    .post("order/loan-create")
    .send(data)
    .set("token", userToken);
  return res;
};
