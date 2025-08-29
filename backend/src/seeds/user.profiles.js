import {config} from "dotenv";
import {connectDB} from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
    // Female Users
    {
        email: "emma.thompson@example.com",
        fullName: "Precious",
        password: "12345678",
        profilePic: "",
    },
    {
        email: "olivia.miller@example.com",
        fullName: "Tomi Akinpelu",
        password: "12345678",
        profilePic: "",
    },
    {
        email: "ava.wilson@example.com",
        fullName: "Oyinkansola",
        password: "12345678",
        profilePic: "",
    },
    {
        email: "isabella.brown@example.com",
        fullName: "Ebunoluwa J",
        password: "12345678",
        profilePic: "",
    },
    {
        email: "charlotte.williams@example.com",
        fullName: "Bukanla Olashile",
        password: "12345678",
        profilePic: "",
    },
    {
        email: "amelia.garcia@example.com",
        fullName: "Joy Oluwole",
        password: "12345678",
        profilePic: "",
    },

    // Male Users
    {
        email: "william.clark@example.com",
        fullName: "Bayo Adu",
        password: "12345678",
        profilePic: "",
    },
    {
        email: "henry.jackson@example.com",
        fullName: "Henry Obawole",
        password: "12345678",
        profilePic: "",
    },
    {
        email: "alexander.martin@example.com",
        fullName: "Martins Victor",
        password: "12345678",
        profilePic: "",
    },
    {
        email: "daniel.rodriguez@example.com",
        fullName: "Daniel Rodriguez",
        password: "12345678",
        profilePic: "",
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

// Call the function
seedDatabase();