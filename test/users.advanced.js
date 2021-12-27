import { describe, interfaces, it } from "mocha";
import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v1/");
import { expect } from "chai";

const TOKEN =
  "a42013229a54d70b3fd0732e02ab6903719d469a666807cbff8874c5eee44a66";

describe.only("Users", () => {
  describe("POST", () => {
    it("POST /users", () => {
      const data = {
        email: `tez-test${Math.floor(Math.random() * 9999)}@mail.by`,
        name: "Sayyora",
        gender: "female",
        status: "active",
      };
      return request
        .post("users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
        });
    });
  });

  describe("GET", () => {
    it("GET /users", () => {
      return request.get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data).to.not.be.empty;
      });
    });

    it("GET/users/id", () => {
      return request.get(`users/354?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data.id).to.be.eq(354);
      });
    });

    it("GET/users with query params", () => {
      const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
      return request.get(url).then((res) => {
        expect(res.body.data).to.not.be.empty;
        res.body.data.forEach((data) => {
          expect(data.gender).to.eq("female");
          expect(data.status).to.eq("active");
        });
      });
    });
  });

  describe("PUT", () => {
    it("PUT /users/id", () => {
      const data = {
        status: "active",
        name: `Morgen - ${Math.floor(Math.random() * 7777)}`,
      };

      return request
        .put("users/358")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
        });
    });
  });

  describe("DELETE", () => {
    it("DELETE /users/:id", () => {
      return request
        .delete("users/340")
        .set("Authorization", `Bearer ${TOKEN}`)
        .then((res) => {
          console.log(res.body.data);
          expect(res.body.data).to.be.eq(undefined);
        });
    });
  });
});
