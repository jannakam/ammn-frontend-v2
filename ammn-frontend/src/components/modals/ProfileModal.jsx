import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { getMyUser } from "@/actions/users";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    civilId: "",
    phoneNumber: "",
  });

  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    civilId: false,
    phoneNumber: false,
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const userData = await getMyUser();
        setProfile({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          civilId: userData.civilId,
          phoneNumber: userData.phoneNumber,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

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
    console.log("Profile saved:", profile);
    alert("Profile saved successfully!");
  };

  return (
    <div className=" p-6 bg-background">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
                  className={isEditing.firstName ? "border-accent" : "bg-background"}
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
                  className={isEditing.lastName ? "border-accent" : "bg-background"}
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
                  className={isEditing.email ? "border-accent" : "bg-background"}
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
                  className={isEditing.phoneNumber ? "border-accent" : "bg-background"}
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
                className={isEditing.civilId ? "border-accent" : "bg-background"}
              />
              <Pencil
                className="w-5 h-5 text-accent cursor-pointer"
                onClick={() => handleEditToggle("civilId")}
              />
            </div>
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}
