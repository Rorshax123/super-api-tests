import request from "../config/common";
import { expect } from "chai";
import { describe } from "mocha";


describe('https://texnomart.uz/ru', () => {
   it('Получение главной страницы', async () => {
      const res = await request.get('ru');
         expect(res.statusCode).to.be.eq(200);
   });

   it.only("Проверка корректного номера и повтора ", async () => {
     const data = {
       phone: "+(998)977111714",
     };
     const res = await request
       .post("/front-api/user/login-phone")
       .send(data);

       expect(res.body.data.message).to.be.eq("SMS code sent");
   
      const secRes = await request.post("/front-api/user/login-phone").send(data);
      expect(secRes.body.error_code).to.be.eq(401);
      expect(secRes.body.message).to.be.eq("SMS code already sent");

   });

   it("Проверка не корректного номера", async () => {
     const data = {
       phone: "+(998)121211212",
     };
     const res = await request.post("front-api/user/check-phone").send(data);

     expect(res.body.data.is_registered).to.be.eq(false);
   });
})