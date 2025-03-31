// import { Role } from "@prisma/client"; // Ensure this import is correct
// import client from "@/db"; // Import your Prisma client
// import bcrypt from 'bcryptjs';

// async function createAdmin() {
//   const adminUser = await client.user.create({
//     data: {
//       fullname: "Admin User",
//       mobile: "9840271180", // Replace with your admin mobile number
//       email: "admin@example.com", // Replace with your admin email
//       password: await bcrypt.hash("Admin@1234", 10), // Hashed password with special character
//       role: Role.ADMIN, // Use the Role enum here
//     },
//   });

//   console.log("Admin user created:", adminUser);
// }

// createAdmin().catch((e) => {
//   console.error("Error creating admin user:", e);
//   process.exit(1);
// });
