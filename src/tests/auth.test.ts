import request from "supertest";
import { app, setupDatabase } from "./testHelpers";
import { UserModel } from "@models/userModel";

setupDatabase();

describe("Auth Routes", () => {
  describe("POST /auth/register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123",
        username: "testuser",
        name: "Test User",
      };

      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Registered Successfully...");
    });

    it("should return error for existing user", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123",
        username: "testuser",
        name: "Test User",
      };

      // Register first
      await request(app).post("/auth/register").send(userData);

      await UserModel.updateOne(
        { email: userData.email },
        { isVerified: true },
      );

      // Try to register again
      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("User Already Exists...");
    });

    it("should return validation error for invalid email", async () => {
      const userData = {
        email: "invalid-email",
        password: "password123",
      };

      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("email");
    });

    it("should return validation error for password too short", async () => {
      const userData = {
        email: "test2@example.com",
        password: "123",
      };

      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("password");
    });

    it("should return validation error for username too short", async () => {
      const userData = {
        email: "test3@example.com",
        password: "password123",
        username: "ab",
      };

      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("username");
    });

    it("should return validation error for username too long", async () => {
      const userData = {
        email: "test4@example.com",
        password: "password123",
        username: "a".repeat(31),
      };

      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("username");
    });

    it("should return validation error for name too long", async () => {
      const userData = {
        email: "test5@example.com",
        password: "password123",
        name: "a".repeat(51),
      };

      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("name");
    });

    it("should return validation error for invalid phone number", async () => {
      const userData = {
        email: "test6@example.com",
        password: "password123",
        phoneNumber: "invalid",
      };

      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("phoneNumber");
    });

    it("should return validation error for bio too long", async () => {
      const userData = {
        email: "test7@example.com",
        password: "password123",
        bio: "a".repeat(501),
      };

      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("bio");
    });

    it("should return validation error for invalid avatar URI", async () => {
      const userData = {
        email: "test8@example.com",
        password: "password123",
        avatar: "not-a-uri",
      };

      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("avatar");
    });

    it("should return validation error for city too long", async () => {
      const userData = {
        email: "test9@example.com",
        password: "password123",
        city: "a".repeat(51),
      };

      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("city");
    });

    it("should return validation error for country too long", async () => {
      const userData = {
        email: "test10@example.com",
        password: "password123",
        country: "a".repeat(51),
      };

      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("country");
    });
  });

  describe("POST /auth/login", () => {
    beforeEach(async () => {
      // Register a user for login tests
      const userData = {
        email: "test@example.com",
        password: "password123",
        username: "testuser",
        name: "Test User",
      };
      await request(app).post("/auth/register").send(userData);
      // Verify the user for testing
      await UserModel.updateOne(
        { email: userData.email },
        { isVerified: true },
      );
    });

    it("should login successfully with correct credentials", async () => {
      const loginData = {
        email: "test@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/auth/login")
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Login Successfully");
      expect(response.body.token).toBeDefined();
    });

    it("should return error for invalid credentials", async () => {
      const loginData = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      const response = await request(app)
        .post("/auth/login")
        .send(loginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return error for non-existent user", async () => {
      const loginData = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/auth/login")
        .send(loginData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid Credential");
    });

    it("should return validation error for invalid email", async () => {
      const loginData = {
        email: "invalid-email",
        password: "password123",
      };

      const response = await request(app)
        .post("/auth/login")
        .send(loginData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("email");
    });

    it("should return validation error for missing password", async () => {
      const loginData = {
        email: "test@example.com",
      };

      const response = await request(app)
        .post("/auth/login")
        .send(loginData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("password");
    });

    it("should return error for unverified user", async () => {
      // Register a new user without verifying
      const userData = {
        email: "unverified@example.com",
        password: "password123",
      };
      await request(app).post("/auth/register").send(userData);

      const loginData = {
        email: "unverified@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/auth/login")
        .send(loginData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Please verify your email first");
    });

    it("should login successfully with different email casing", async () => {
      // Register with mixed case
      const userData = {
        email: "Test@Example.Com",
        password: "password123",
        username: "testuser2",
        name: "Test User 2",
      };
      await request(app).post("/auth/register").send(userData);
      await UserModel.updateOne(
        { email: "test@example.com" }, // Now stored as lowercase
        { isVerified: true },
      );

      // Login with lowercase
      const loginData = {
        email: "test@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/auth/login")
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Login Successfully");
      expect(response.body.token).toBeDefined();
    });
    describe("POST /auth/verify-mail", () => {
      it("should return validation error for missing token", async () => {
        const response = await request(app)
          .post("/auth/verify-mail")
          .send({})
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain("token");
      });

      it("should return error for invalid token", async () => {
        const response = await request(app)
          .post("/auth/verify-mail")
          .send({ token: "invalid-token" })
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Invalid Token");
      });
    });
  });
});
