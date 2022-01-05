import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v1/");

const TOKEN =
  "a42013229a54d70b3fd0732e02ab6903719d469a666807cbff8874c5eee44a66";

export const createRandomUser = async () => {
  const userData = {
    email: `tez-test${Math.floor(Math.random() * 9999)}@mail.by`,
    name: "Sayyora",
    gender: "female",
    status: "active",
  };

  const res = await request
    .post("users")
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(userData);

  return res.body.data.id;
};
