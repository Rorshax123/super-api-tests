require('dotenv').config();
import request from "../config/common";
const faker = require('faker');

import { expect } from "chai";
import { createRandomUser } from "../helper/user_helper";

      const TOKEN = process.env.USER_TOKEN;
      let postId, userId;

describe("User posts", () => {



  before(async() => {
     userId = await createRandomUser();
      });

  it("/posts", async () => {
     
        const data = {
          user_id: userId,
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraph(),
        };
        const postRes = await request
          .post('posts')
          .set('Authorization', `Bearer ${TOKEN}`)
          .send(data);

        expect(postRes.body.data).to.deep.include(data);
        postId = postRes.body.data.id;
        
      });
     

       it('Get posts/id', async () => {
          await request
           .get(`posts/${postId}`)
           .set("Auhorization", `Bearer ${TOKEN}`)
           .expect(200);
       });

}).timeout(10000);

describe('Negative tests', () => {

    before(async () => {
      userId = await createRandomUser();
    });

  it("401 autentification failed", async () => {
    const data = {
      user_id: userId,
      title: "my title",
      body: "my blog post",
    };

    const postRes = await request.post("posts").send(data);

    expect(postRes.statusCode).to.eq(401);
    expect(postRes.body.data.message).to.eq("Authentication failed");
  });

      it("422 validation failed", async () => {
        const data = {
          user_id: userId,
          title: "my title",
        };

        const postRes = await request
          .post("posts")
          .set("Authorization", `Bearer ${TOKEN}`)
          .send(data);

        expect(postRes.statusCode).to.eq(422);
        expect(postRes.body.data[0].message).to.eq("can't be blank");
      });
});