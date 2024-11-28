import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { toast } = useToast();

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    civilId: "123456789",
    phoneNumber: "9876543210",
  });

  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    civilId: false,
    phoneNumber: false,
  });

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    try {
      // Simulate saving logic (replace with actual API call)
      console.log("Saved Profile:", profile);

      // Show success toast
      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);

      // Show error toast
      toast({
        title: "Error",
        description: "Failed to save profile changes.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </Label>
            <div className="relative flex items-center gap-2">
              <Input
                id="firstName"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                readOnly={!isEditing.firstName}
              />
              <Pencil
                className="w-5 h-5 text-accent cursor-pointer"
                onClick={() => handleEditToggle("firstName")}
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </Label>
            <div className="relative flex items-center gap-2">
              <Input
                id="lastName"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                readOnly={!isEditing.lastName}
              />
              <Pencil
                className="w-5 h-5 text-accent cursor-pointer"
                onClick={() => handleEditToggle("lastName")}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative flex items-center gap-2">
              <Input
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                readOnly={!isEditing.email}
              />
              <Pencil
                className="w-5 h-5 text-accent cursor-pointer"
                onClick={() => handleEditToggle("email")}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number
            </Label>
            <div className="relative flex items-center gap-2">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                readOnly={!isEditing.phoneNumber}
              />
              <Pencil
                className="w-5 h-5 text-accent cursor-pointer"
                onClick={() => handleEditToggle("phoneNumber")}
              />
            </div>
          </div>
        </div>

        {/* Civil ID */}
        <div>
          <Label htmlFor="civilId" className="text-sm font-medium">
            Civil ID
          </Label>
          <div className="relative flex items-center gap-2">
            <Input
              id="civilId"
              name="civilId"
              value={profile.civilId}
              onChange={handleChange}
              readOnly={!isEditing.civilId}
            />
            <Pencil
              className="w-5 h-5 text-accent cursor-pointer"
              onClick={() => handleEditToggle("civilId")}
            />
          </div>
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-1/2">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
