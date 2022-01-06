require("dotenv").config();
import request from "../config/common";
const faker = require('faker');



import { expect } from "chai";
import { createRandomUser } from "../helper/user_helper";

const TOKEN = process.env.USER_TOKEN;

describe("Users", () => {
  let userId;
  describe("POST", () => {
    it("/users", async() => {
      userId = await createRandomUser();
    }).timeout(10000);
  });

  describe("GET", () => {
    it("/users", async () => {
      const users = await request
      .get(`users?access-token=${TOKEN}`);
      expect(users.body.data).to.not.be.empty;
      
    });

    it("/users/id", async () => {
      const userByid = await request
      .get(`users/${userId}?access-token=${TOKEN}`);
      expect(userByid.body.data.id).to.be.eq(userId);
    });

    it("/users with query params", async() => {
      const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
      const getRes = await request
      .get(url)
        expect(getRes.body.data).to.not.be.empty;
        getRes.body.data.forEach((data) => {
          expect(data.gender).to.eq("female");
          expect(data.status).to.eq("active");
        });
    });
  });

  describe("PUT", () => {
    it("/users/id", async () => {
      const data = {
        status: "active",
        name: faker.name.firstName(),
      };

      const putRes = await request
        .put(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
      expect(putRes.body.data).to.deep.include(data);
        
    });
  });

  describe("DELETE", () => {
    it("/users/:id", async() => {
      const delRes = await request
        .delete(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
      expect(delRes.body.data).to.be.eq(undefined);
      
    });
  });
});
