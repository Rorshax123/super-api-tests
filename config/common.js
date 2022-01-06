import supertest from "supertest";
import qa from "../config/qa";
const request = supertest(qa.baseurl);

export default request;