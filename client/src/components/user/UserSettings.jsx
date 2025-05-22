import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function UserSettings() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const mockUserData = {
    name: (user && user.name) || "User",
    email: (user && user.email) || "user@example.com",
    avatar: (user && user.avatar) || null,
    role: (user && user.role) || "candidate",
    details:
      user && user.role === "hr"
        ? {
            department: "Human Resources",
            position: "HR Manager",
            company: "TechCorp Inc.",
            phone: "+1 (555) 123-4567",
            employeeId: "HR-" + Math.floor(1000 + Math.random() * 9000),
          }
        : {
            education: "Bachelor in Computer Science",
            university: "Tech University",
            graduationYear: "2022",
            skills: ["JavaScript", "React", "TypeScript", "Node.js"],
            experience: "2 years",
          },
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>User Settings</DialogTitle>
          <DialogDescription>
            View and update your profile information
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 pt-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={mockUserData.avatar || ""}
              alt={mockUserData.name}
            />
            <AvatarFallback className="text-2xl">
              {mockUserData.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{mockUserData.name}</h2>
          <p className="text-muted-foreground">{mockUserData.email}</p>
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize">
            {mockUserData.role}
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4 pt-4">
            <div className="grid gap-4 py-4">
              {mockUserData.role === "hr" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Department
                    </h3>
                    <p>{mockUserData.details.department}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Position
                    </h3>
                    <p>{mockUserData.details.position}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Company
                    </h3>
                    <p>{mockUserData.details.company}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Phone
                    </h3>
                    <p>{mockUserData.details.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Employee ID
                    </h3>
                    <p>{mockUserData.details.employeeId}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Education
                      </h3>
                      <p>{mockUserData.details.education}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        University
                      </h3>
                      <p>{mockUserData.details.university}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Graduation Year
                      </h3>
                      <p>{mockUserData.details.graduationYear}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Experience
                      </h3>
                      <p>{mockUserData.details.experience}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {mockUserData.details.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-secondary px-2 py-1 text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
          <TabsContent value="account">
            <div className="space-y-4 py-4">
              <p className="text-muted-foreground text-sm">
                Account settings coming soon...
              </p>
            </div>
          </TabsContent>
          <TabsContent value="preferences">
            <div className="space-y-4 py-4">
              <p className="text-muted-foreground text-sm">
                Preferences settings coming soon...
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button disabled>Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
