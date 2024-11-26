import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function page() {
  const profile = {
    image:
      "https://i.pinimg.com/736x/db/08/0f/db080fceb9fa616315bd6f9c3b8a9632.jpg",
    name: "Nora Almarri",
    email: "nora@nora.com",
    phoneNumber: "51008484",
    civilId: "296120400000",
  };

  // I added a welcome thingy so i think the name might be not needed , either way you're going to change it so GO Wild =))
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            <span className="text-stone-600">Welcome </span>
            <span className="text-stone-300">{profile.name}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <Image
                src={profile.image}
                //src={profile.image}
                alt={`Profile picture of ${profile.name}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2 text-center">
              <p className="text-stone-400">Name: {profile.name}</p>
              <p className="text-stone-400">Email: {profile.email}</p>
              <p className="text-stone-400">
                Phone Number: {profile.phoneNumber}
              </p>
              <p className="text-gray-600">Civil ID: {profile.civilId}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
