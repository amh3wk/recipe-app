import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const userEmail = localStorage.getItem("userEmail") || "user@example.com";

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{userEmail}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Member since today</span>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleLogout} variant="destructive" className="w-full">
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
};

export default Profile;