import { describe, it } from "mocha";
import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v1/");
import { expect } from "chai";
import { createRandomUser } from "../helper/user_helper";

const TOKEN =
  "a42013229a54d70b3fd0732e02ab6903719d469a666807cbff8874c5eee44a66";

      let postId, userId;

describe("User posts", () => {



  before(async() => {
     userId = await createRandomUser();
      });

  it("/posts", async () => {
     
        const data = {
          user_id: userId,
          title: 'my title',
          body: 'my blog post',
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

  it.only("401 autentification failed", async () => {
     
        const data = {
          user_id: userId,
          title: 'my title',
          body: 'my blog post',
        };

        const postRes = await request
          .post('posts')
          .send(data);

        expect(postRes.statusCode).to.eq(401);   
        expect(postRes.body.data.message).to.eq("Authentication failed");    
      });
});