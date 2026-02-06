import request from "supertest";
import { app, setupDatabase } from "./testHelpers";
import { UserModel } from "@models/userModel";

setupDatabase();

describe("User Routes", () => {
  let token: string;

  beforeEach(async () => {
    // Register and login to get token for each test
    const userData = {
      email: "update@example.com",
      password: "password123",
      username: "updateuser",
      name: "Update User",
    };
    await request(app).post("/auth/register").send(userData);
    await UserModel.updateOne({ email: userData.email }, { isVerified: true }); // For simplicity, assume user is verified

    const loginResponse = await request(app)
      .post("/auth/login")
      .send({ email: userData.email, password: userData.password });

    token = loginResponse.body.token;
  });

  describe("PUT /user/update", () => {
    it("should update user successfully", async () => {
      const updateData = {
        name: "Updated Name",
        bio: "Updated bio",
      };

      const response = await request(app)
        .put("/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User updated successfully");
      expect(response.body.data.name).toBe("Updated Name");
      expect(response.body.data.bio).toBe("Updated bio");
    });

    it("should return error for trying to update email", async () => {
      const updateData = {
        email: "newemail@example.com",
      };

      const response = await request(app)
        .put("/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send(updateData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('"email" is not allowed');
    });

    it("should return validation error for username too short", async () => {
      const updateData = {
        username: "ab",
      };

      const response = await request(app)
        .put("/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send(updateData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("username");
    });

    it("should return validation error for name too long", async () => {
      const updateData = {
        name: "a".repeat(51),
      };

      const response = await request(app)
        .put("/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send(updateData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("name");
    });

    it("should return validation error for invalid phone number", async () => {
      const updateData = {
        phoneNumber: "invalid",
      };

      const response = await request(app)
        .put("/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send(updateData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("phoneNumber");
    });

    it("should return validation error for bio too long", async () => {
      const updateData = {
        bio: "a".repeat(501),
      };

      const response = await request(app)
        .put("/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send(updateData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("bio");
    });

    it("should return validation error for invalid avatar URI", async () => {
      const updateData = {
        avatar: "not-a-uri",
      };

      const response = await request(app)
        .put("/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send(updateData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("avatar");
    });

    it("should return validation error for city too long", async () => {
      const updateData = {
        city: "a".repeat(51),
      };

      const response = await request(app)
        .put("/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send(updateData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("city");
    });

    it("should return validation error for country too long", async () => {
      const updateData = {
        country: "a".repeat(51),
      };

      const response = await request(app)
        .put("/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send(updateData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("country");
    });

    it("should return validation error for password too short", async () => {
      const updateData = {
        password: "123",
      };

      const response = await request(app)
        .put("/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send(updateData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("password");
    });
  });
});
