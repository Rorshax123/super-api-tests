import { describe, interfaces, it } from "mocha";
import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v1/");
import { expect } from "chai";

const TOKEN =
  "a42013229a54d70b3fd0732e02ab6903719d469a666807cbff8874c5eee44a66";

describe.only("User posts", () => {
  it("/posts", async () => {
    const data = {
      userId: 4,
      title: "my title",
      body: "my blog post",
    };

    const res = await request
      .post('posts')
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data);

      console.log(res.body);
  });
});
