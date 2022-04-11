import request from "../config/common";
import { expect } from "chai";
import { describe } from "mocha";
import { deleteUser, registerUser } from "../helper/register_helper";

const phoneNumber = "+998977111714";
const firstName = "test";
const lastName = "test";
const code = "12345";

async function sleep(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

describe.only("Login", () => {
  it("Sms code sent to phone number", async () => {
    registerUser(phoneNumber, firstName, lastName, code);
    let data = {
      phone: phoneNumber,
    };
    try {
      try {
        //проверяем что пользователь не отправлял раньше смс код(в течении 60 секунд) если отправлял то подверждаем и снова отправляем запрос на логин
        const res = await request.post("user/login-phone").send(data);
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.error_code).to.be.equal(0);
        expect(res.body.message).to.be.equal("SMS code sent");
      } catch (error) {
        let verifyData = {
          phone: phoneNumber,
          code: code,
        };
        await request.post("user/login-phone-verify").send(verifyData);

        let phoneData = {
          phone: phoneNumber,
        };
        const secondRes = await request
          .post("user/login-phone")
          .send(phoneData);
        expect(secondRes.statusCode).to.be.equal(200);
        expect(secondRes.body.error_code).to.be.equal(0);
        expect(secondRes.body.message).to.be.equal("SMS code sent");
      }
    } catch (err) {
      await registerUser(phoneNumber, firstName, lastName, code);
      const secondRes = await request.post("user/login-phone").send(data);
      console.log(secondRes.body);
      expect(secondRes.statusCode).to.be.equal(200);
      expect(secondRes.body.error_code).to.be.equal(0);
      expect(secondRes.body.message).to.be.equal("SMS code sent");
    }
  });

  it("Sms code already sent", async () => {
    //пробуем отправить код и получить ожидаемый ответ
    try {
      let data = {
        phone: phoneNumber,
      };
      const res = await request.post("user/login-phone").send(data);
      expect(res.statusCode).to.be.equal(200);
      expect(res.body.error_code).to.be.equal(401);
      expect(res.body.message).to.be.equal("SMS code already sent");
      expect(res.body.data.expire_at).is.not.null;
    } catch (err) {
      //если не успешен, то верифицируем номер, потом снова отправляем два запроса что бы проверить две отправки смс на один номер в течении 60 секунд
      let verifyData = {
        phone: phoneNumber,
        code: code,
      };
      await request.post("user/login-phone-verify").send(verifyData);

      let phoneData = {
        phone: phoneNumber,
      };
      await request.post("user/login-phone").send(phoneData);

      const res = await request.post("user/login-phone").send(phoneData);
      expect(res.statusCode).to.be.equal(200);
      expect(res.body.error_code).to.be.equal(401);
      expect(res.body.message).to.be.equal("SMS code already sent");
      expect(res.body.data.expire_at).is.not.null;
    }
  });

  it("User not found", async () => {
    await deleteUser();
    let data = {
      phone: phoneNumber,
    };
    const res = await request.post("user/login-phone").send(data);
    expect(res.statusCode).to.be.equal(200);
    expect(res.body.error_code).to.be.equal(400);
    expect(res.body.message).to.be.equal("User not found");
  });

  it("Incorrect phone number", async () => {
    let data = {
      phone: "+998912",
    };
    const res = await request.post("user/login-phone").send(data);
    expect(res.statusCode).to.be.equal(200);
    expect(res.body.error_code).to.be.equal(400);
    expect(res.body.message).to.be.equal("User not found");
  });

  it("Empty field for sent sms code", async () => {
    let data = {
      phone: "",
    };
    const res = await request.post("user/login-phone").send(data);
    expect(res.statusCode).to.be.equal(422);
    expect(res.body.error_code).to.be.equal(400);
    expect(res.body.message).to.be.equal("Необходимо заполнить «Phone».");
    expect(res.body.data[0].field).to.be.equal("phone");
    expect(res.body.data[0].message).to.be.equal(
      "Необходимо заполнить «Phone»."
    );
  });
});

describe("Verify login", () => {
  beforeEach(
    "перед каждым тестом проверяем есть ли пользователь 97 вообще",
    async () => {
      //Пользователь может и не быть, из за этого создаем
      try {
        mainData = {
          phone: phoneNumber,
        };
        const mainRes = await request.post("user/login-phone").send(mainData);
        expect(mainRes.body.success).to.be.equal(true);
      } catch (err) {
        await registerUser(phoneNumber, firstName, lastName, code);
      }
    }
  );
  it("Correct sms code", async () => {
    //Отправляем код
    const phoneData = {
      phone: phoneNumber,
    };
    await request.post("user/login-phone").send(phoneData);
    //**********/
    const data = {
      phone: phoneNumber,
      code: code,
    };
    const res = await request.post("user/login-phone-verify").send(data);
    expect(res.statusCode).to.be.equal(200);
    expect(res.body.success).to.be.equal(true);
    expect(res.body.error_code).to.be.equal(0);
    expect(res.body.message).to.be.equal("");
    expect(res.body.data.phone).to.be.equal("998977111714");
    expect(res.body.data.name).to.be.equal(firstName);
    expect(res.body.data.surname).to.be.equal(lastName);
  });
  it("Incorrect sms code", async () => {
    //Отправляем код
    const phoneData = {
      phone: phoneNumber,
    };
    await request.post("user/login-phone").send(phoneData);
    //**********/
    const data = {
      phone: phoneNumber,
      code: "54321",
    };
    const res = await request.post("user/login-phone-verify").send(data);
    expect(res.statusCode).to.be.equal(200);
    expect(res.body.success).to.be.equal(false);
    expect(res.body.error_code).to.be.equal(400);
    expect(res.body.message).to.be.equal("Ошибка кода");
  });

  it("Send empty field for code", async () => {
    //Отправляем код
    const phoneData = {
      phone: phoneNumber,
    };
    await request.post("user/login-phone").send(phoneData);
    //**********/
    const data = {
      phone: phoneNumber,
      code: "",
    };
    const res = await request.post("user/login-phone-verify").send(data);
    expect(res.statusCode).to.be.equal(422);
    expect(res.body.success).to.be.equal(false);
    expect(res.body.error_code).to.be.equal(400);
    expect(res.body.message).to.be.equal("Необходимо заполнить «Code».");
  });

  it("Sms code life time is end", async function () {
    //меняем timeout mocha что бы не вышел ошибка тайм оута
    this.timeout(65000);
    //Отправляем запрос на логин
    let data = {
      phone: phoneNumber,
    };
    await request.post("user/login-phone").send(data);
    //************/
    //ждем пока timeout кода истечет
    await sleep(61000);

    const smsData = {
      phone: phoneNumber,
      code: code,
    };
    const res = await request.post("user/login-phone-verify").send(smsData);
    expect(res.statusCode).to.be.equal(200);
    expect(res.body.success).to.be.equal(false);
    expect(res.body.error_code).to.be.equal(400);
    expect(res.body.message).to.be.equal("Срок действия кода истек");
  });
});

describe("Registration", () => {
  beforeEach("Удаляем аккаунт перед запросом смс кода", async () => {
    await deleteUser();
  });
  it("Send sms code", async () => {
    //Пробуем проверить что смс не был отправлен раньше, если отправлен и возвращается ошибка то создаем и удаляем аккаунт
    try {
      let data = {
        phone: "+998977111714",
        first_name: "test",
        last_name: "test",
      };
      const res = await request.post("user/register").send(data);
      expect(res.body.success).to.be.equal(true);
      expect(res.body.message).to.be.equal("code sent");
      expect(res.body.data.expired_in).to.be.equal(60);
    } catch (err) {
      let smsData = {
        phone: "+998977111714",
        code: "12345",
      };
      let dataForReg = {
        phone: "+998977111714",
        first_name: "test",
        last_name: "test",
      };
      await request.post("user/verify-code").send(smsData);
      await request.get("user/delete-user");
      const res = await request.post("user/register").send(dataForReg);
      expect(res.body.success).to.be.equal(true);
      expect(res.body.message).to.be.equal("code sent");
      expect(res.body.data.expired_in).to.be.equal(60);
    }
  });

  it("Sms code already sent", async () => {
    let data = {
      phone: "+998977111714",
      first_name: "test",
      last_name: "test",
    };
    await request.post("user/register").send(data);
    const resSended = await request.post("user/register").send(data);
    expect(resSended.body.success).to.be.equal(true);
    expect(resSended.body.message).to.be.equal("code already sent");
  });

  it("Send code with empty phone", async () => {
    let data = {
      phone: "",
      first_name: "test",
      last_name: "test",
    };
    const res = await request.post("user/register").send(data);
    expect(res.body.success).to.be.equal(false);
    expect(res.body.error_code).to.be.equal(400);
    expect(res.body.message).to.be.equal("Phone error");
  });

  it("Send code with empty name or last_name", async () => {
    try {
      let data = {
        phone: "+998977111714",
        first_name: "",
        last_name: "",
      };
      const res = await request.post("user/register").send(data);
      expect(res.body.success).to.be.equal(false);
      expect(res.body.error_code).to.be.equal(400);
      expect(res.body.message).to.be.equal("Data error");
    } catch (err) {
      let smsData = {
        phone: "+998977111714",
        code: "12345",
      };
      let dataForReg = {
        phone: "+998977111714",
        first_name: "",
        last_name: "",
      };
      await request.post("user/verify-code").send(smsData);
      await request.get("user/delete-user");
      const res = await request.post("user/register").send(dataForReg);
      expect(res.body.success).to.be.equal(false);
      expect(res.body.error_code).to.be.equal(400);
      expect(res.body.message).to.be.equal("Data error");
    }
  });
});

describe("Verify registration", () => {
  beforeEach("", async () => {
    await deleteUser();
  });
  it("Successful registration", async () => {
    const res = await registerUser(phoneNumber, firstName, lastName, code);
    expect(res.body.data.phone).to.be.equal("998977111714");
    expect(res.body.data.email).to.be.equal("998977111714");
    expect(res.body.data.guid_tm).to.not.equal(null);
    expect(res.body.data.guid_tm).to.not.equal("");
    expect(res.body.data.token).to.not.equal(null);
    expect(res.body.data.token).to.not.equal("");
    expect(res.body.data.name).to.be.equal(firstName);
    expect(res.body.data.surname).to.be.equal(lastName);
  });

  it("Incorrect code", async () => {
    let wrongCode = 54321;
    const res = await registerUser(phoneNumber, firstName, lastName, wrongCode);
    expect(res.body.success).to.be.equal(false);
    expect(res.body.error_code).to.be.equal(400);
    expect(res.body.message).to.be.equal("Ошибка кода");
  });
  it("Phone not found", async () => {
    const res = await registerUser("", firstName, lastName, code);
    expect(res.body.success).to.be.equal(false);
    expect(res.body.error_code).to.be.equal(400);
    expect(res.body.message).to.be.equal("Not found");
  });
  it("Code is outdated", async function () {
    this.timeout(65000);
    const res = await registerUser(
      phoneNumber,
      firstName,
      lastName,
      code,
      61000
    );
    expect(res.body.success).to.be.equal(false);
    expect(res.body.error_code).to.be.equal(400);
    expect(res.body.message).to.be.equal("Срок действия кода истек");
  });
});

describe("Check auth key", () => {
  let USER_TOKEN;
  beforeEach("Take a token", async () => {
    //перед каждым тестом удаляем аккаунт и создаем, от созданного пользователья возмем токен для использования дльше
    await deleteUser();
    const mainRes = await registerUser(phoneNumber, firstName, lastName, code);
    USER_TOKEN = mainRes.body.data.token;
  });

  it("Successfully auth key", async () => {
    const data = {
      auth_key: USER_TOKEN,
    };
    const res = await request.post("user/check-auth-key").send(data);
    expect(res.body.data.phone).to.be.equal("998977111714");
    expect(res.body.data.email).to.be.equal("998977111714");
    expect(res.body.data.guid_tm).to.not.equal(null);
    expect(res.body.data.guid_tm).to.not.equal("");
    expect(res.body.data.token).to.be.equal(USER_TOKEN);
    expect(res.body.data.name).to.be.equal(firstName);
    expect(res.body.data.surname).to.be.equal(lastName);
  });

  it("Auth key is expired", async () => {
    await deleteUser();
    const data = {
      auth_key: USER_TOKEN,
    };
    const res = await request.post("user/check-auth-key").send(data);
    expect(res.body.success).to.be.equal(false);
    expect(res.body.error_code).to.be.equal(400);
    expect(res.body.message).to.be.equal("Auth Key expired");
  });
});

describe("Check number", () => {
  beforeEach("Delete then create account on every step", async () => {
    await deleteUser();
    await registerUser(phoneNumber, firstName, lastName, code);
  });

  it("Check is registered", async () => {
    let data = {
      phone: phoneNumber,
    };
    const res = await request.post("user/check-phone").send(data);
    expect(res.body.success).to.be.equal(true);
    expect(res.body.error_code).to.be.equal(0);
    expect(res.body.data.is_registered).to.be.equal(true);
  });

  it("Check is not register", async () => {
     await deleteUser();
    let data = {
      phone: phoneNumber,
    };
    const res = await request.post("user/check-phone").send(data);
    expect(res.body.success).to.be.equal(true);
    expect(res.body.error_code).to.be.equal(0);
    expect(res.body.data.is_registered).to.be.equal(false);
  });
});
