import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [profile, setProfile] = useState({
    image:
      "https://i.pinimg.com/736x/db/08/0f/db080fceb9fa616315bd6f9c3b8a9632.jpg",
    name: "Nora Almarri",
    email: "nora@nora.com",
    phoneNumber: "51008484",
    civilId: "296120400000",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Profile saved:", profile);
    alert("Profile saved successfully!");
  };

  return (
    <div className="min-h-[38rem] max-h-[38rem] w-full overflow-scroll p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            <span className="text-foreground">Welcome </span>
            <span className="text-accent">{profile.name}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Image */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <Image
                src={profile.image}
                alt={`Profile picture of ${profile.name}`}
                fill
                className="object-cover"
              />
            </div>

            {/* Editable Profile Fields */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full"
                />
              </div>

              {/* Civil ID Field (Full Width) */}
              <div className="col-span-">
                <label htmlFor="civilId" className="text-sm font-medium text-muted-foreground">
                  Civil ID
                </label>
                <Input
                  id="civilId"
                  name="civilId"
                  value={profile.civilId}
                  onChange={handleChange}
                  placeholder="Enter your Civil ID"
                  className="w-full"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-4 w-full">
              <Button onClick={handleSave} className="hover:bg-accent-hover w-full">
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
