import request from "supertest";

// change the static id and email and minPrice to your own value so that the testing works.

const baseUrl = "http://localhost:5000";
const static_id = "668bef1d9a36df40cdbf5ef8";
const minPrice = 50;
const static_email = "pokhrelhari101@gmail.com";

describe("Product API Routes", () => {
  it("should return a list of products", async () => {
    const response = await request(baseUrl).get("/api/getproducts");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should create a new product", async () => {
    const product = {
      name: "Test Product",
      price: 100,
      description: "This is a test product",
      stock: 10,
    };
    const response = await request(baseUrl)
      .post("/api/postproducts")
      .send(product);
    expect(response.status).toBe(201);
  });

  it("should update an existing product", async () => {
    const updateProduct = {
      name: "Updated Test Product",
      price: 150,
      description: "This is an updated test product",
    };
    const response = await request(baseUrl)
      .patch(`/api/updateproducts/${static_id}`)
      .send(updateProduct);
    expect(response.status).toBe(200);
  });

  it("should delete a product", async () => {
    const response = await request(baseUrl).delete(
      `/api/deleteproducts/${static_id}`
    );
    expect(response.status).toBe(200);
  });

  it("should show the filtered products", async () => {
    const response = await request(baseUrl).get(
      `/api/filtered?minPrice=${minPrice}`
    );
    expect(response.status).toBe(200);
  });
});

describe("User API Routes", () => {
  it("should create a new user", async () => {
    const newUser = {
      name: "Hari Pokhrel",
      email: static_email,
      password: "123456",
    };
    const response = await request(baseUrl)
      .post("/user/register")
      .send(newUser);
    expect(response.status).toBe(201);
  });

  it("should send error if user with email already exists", async () => {
    const newUser = {
      name: "Test Hari",
      email: static_email,
      password: "123456",
    };
    const response = await request(baseUrl)
      .post("/user/register")
      .send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists");
  });

  it("should login a user", async () => {
    const loginUser = {
      email: static_email,
      password: "123456",
    };
    const response = await request(baseUrl).post("/user/login").send(loginUser);
    expect(response.status).toBe(200);
  });
});
