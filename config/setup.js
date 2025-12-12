import mongoose from "mongoose";
import { connectDB } from "./db.js";

try {
  await connectDB();
  const command = "collMod";
  const db = mongoose.connection.db;

  await db.command({
    [command]: "users",
    validator: {
      $jsonSchema: {
        required: ["_id", "name", "email", "password", "picture", "rootDirId"],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
            minLength: 2,
            description: "Name should be longer than three charactors",
          },
          email: {
            bsonType: "string",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
            description: "Please enter a valid email!",
          },
          password: {
            bsonType: "string",
            minLength: 4,
          },
          picture: {
            bsonType: ["string", "null"],
          },
          rootDirId: {
            bsonType: "objectId",
          },
          isDeleted: {
            bsonType: "bool",
          },
          role: {
            bsonType: "number",
          },
          maxStorageInBytes: {
            bsonType: "number",
          },
        },
        additionalProperties: false,
      },
    },
    validationAction: "error",
    validationLevel: "strict",
  });

  await db.command({
    [command]: "directories",
    validator: {
      $jsonSchema: {
        required: ["_id", "name", "parentDirId", "userId"],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
            description: "Name should be longer than three charators",
          },
          size: {
            bsonType: "number",
          },
          path: {
            bsonType: "array",
            items: {
              bsonType: "objectId",
            },
          },
          parentDirId: {
            bsonType: ["objectId", "null"],
          },
          userId: {
            bsonType: "objectId",
          },
          isPublic: {
            bsonType: "bool",
          },
          createdAt: {
            bsonType: "date",
          },
          updatedAt: {
            bsonType: "date",
          },
        },
        additionalProperties: false,
      },
    },
    validationAction: "error",
    validationLevel: "strict",
  });

  await db.command({
    [command]: "files",
    validator: {
      $jsonSchema: {
        required: ["_id", "name", "parentDirId", "userId", "extention"],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
            description: "Name should be longer than three charator",
          },
          size: {
            bsonType: "number",
          },
          parentDirId: {
            bsonType: "objectId",
          },
          userId: {
            bsonType: "objectId",
          },
          extention: {
            bsonType: "string",
          },
          isPublic: {
            bsonType: "bool",
          },
          createdAt: {
            bsonType: "date",
          },
          updatedAt: {
            bsonType: "date",
          },
        },
        additionalProperties: false,
      },
    },
    validationAction: "error",
    validationLevel: "strict",
  });
} catch (error) {
  console.log("Something went wrong while setting up database!".error);
}
await mongoose.disconnect();
