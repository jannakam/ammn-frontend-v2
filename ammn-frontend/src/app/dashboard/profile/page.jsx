// "use client";
// import { useState, useEffect } from "react";
// import { getUser } from "@/actions/auth";
// import { baseUrl } from "@/actions/config";
// import ImageUpload from "@/components/ImageUpload/ImageUpload";

// export default function page() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await getUser();
//         setUser(userData);
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-lg text-gray-700">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center p-8 mt-16 min-h-screen">
//       <h1 className="text-4xl font-bold text-gray-800 mb-8">
//         Welcome {user.username}
//       </h1>
//       {/* <ImageUpload
//           initialImage={`${baseUrl}/${user.image}`}
//           balance={user.balance}
//         /> */}
//     </div>
//   );
// }
