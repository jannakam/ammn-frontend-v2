import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

  // Fetch user data using getMyUser
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const userData = await getMyUser(); // Assume getMyUser is passed as a prop
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
  }, [getMyUser]);

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
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-6">
          {/* First Name */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              First Name
            </label>
            {isEditing.firstName ? (
              <Input
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                onBlur={() => handleEditToggle("firstName")}
                autoFocus
              />
            ) : (
              <div className="flex items-center gap-2">
                <span>{profile.firstName}</span>
                <Pencil
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleEditToggle("firstName")}
                />
              </div>
            )}
          </div>

          {/* Last Name */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Last Name
            </label>
            {isEditing.lastName ? (
              <Input
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                onBlur={() => handleEditToggle("lastName")}
                autoFocus
              />
            ) : (
              <div className="flex items-center gap-2">
                <span>{profile.lastName}</span>
                <Pencil
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleEditToggle("lastName")}
                />
              </div>
            )}
          </div>

          {/* Email */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            {isEditing.email ? (
              <Input
                name="email"
                value={profile.email}
                onChange={handleChange}
                onBlur={() => handleEditToggle("email")}
                autoFocus
              />
            ) : (
              <div className="flex items-center gap-2">
                <span>{profile.email}</span>
                <Pencil
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleEditToggle("email")}
                />
              </div>
            )}
          </div>

          {/* Civil ID */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Civil ID
            </label>
            {isEditing.civilId ? (
              <Input
                name="civilId"
                value={profile.civilId}
                onChange={handleChange}
                onBlur={() => handleEditToggle("civilId")}
                autoFocus
              />
            ) : (
              <div className="flex items-center gap-2">
                <span>{profile.civilId}</span>
                <Pencil
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleEditToggle("civilId")}
                />
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Phone Number
            </label>
            {isEditing.phoneNumber ? (
              <Input
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                onBlur={() => handleEditToggle("phoneNumber")}
                autoFocus
              />
            ) : (
              <div className="flex items-center gap-2">
                <span>{profile.phoneNumber}</span>
                <Pencil
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleEditToggle("phoneNumber")}
                />
              </div>
            )}
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            variant="primary"
            className="mt-6 w-full"
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}
