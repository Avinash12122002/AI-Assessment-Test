import { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, loading } = useAuth();

  const [roleTab, setRoleTab] = useState("candidate"); // Set default tab to 'candidate'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const emailInputRef = useRef(null); // Reference for the email input

  // Reset email and password when switching tabs
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError(""); // Clear any errors when switching tabs
    // Focus the email input of the active tab
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [roleTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password, roleTab); // pass selected role tab

    if (result.success) {
      setError(""); // Reset error on successful login
      toast({
        title: "Login successful",
        description: `Welcome to the ${
          result.role === "hr" ? "HR" : "Candidate"
        } dashboard`,
      });

      setTimeout(() => {
        navigate(
          result.role === "hr" ? "/hr/dashboard" : "/candidate/dashboard"
        );
      }, 600);
    } else {
      setError(result.error || "Login failed.");
      toast({
        title: "Error",
        description: result.error || "Login failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6 p-6 bg-white shadow-sm rounded-lg border">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Log in</h1>
            <p className="text-muted-foreground text-sm">
              Enter your email below to log in to your account
            </p>
          </div>

          <Tabs
            defaultValue="candidate" // Set default tab to 'candidate'
            onValueChange={(value) => setRoleTab(value)} // Change the selected tab
          >
            <TabsList className="grid w-full grid-cols-2">
              {/* Align Candidate tab on the left and HR tab on the right */}
              <TabsTrigger value="candidate" className="text-left">
                Candidate
              </TabsTrigger>
              <TabsTrigger value="hr" className="text-right">
                HR Professional
              </TabsTrigger>
            </TabsList>

            <TabsContent value="candidate" className="mt-4 space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="candidate-email">Email</Label>
                  <Input
                    id="candidate-email"
                    type="email"
                    placeholder="candidate@example.com"
                    value={email}
                    ref={emailInputRef} // Auto-focus for Candidate tab
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="candidate-password">Password</Label>
                  <Input
                    id="candidate-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[35px] text-sm text-gray-500"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    title={showPassword ? "Hide password" : "Show password"} // Added title for extra clarity
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Log in"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <NavLink
                    to="/register"
                    className="text-primary underline underline-offset-4"
                  >
                    Sign up
                  </NavLink>
                </p>
              </form>
            </TabsContent>

            <TabsContent value="hr" className="mt-4 space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="hr-email">Email</Label>
                  <Input
                    id="hr-email"
                    type="email"
                    placeholder="hr@example.com"
                    value={email}
                    ref={emailInputRef} // Auto-focus for HR tab
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="hr-password">Password</Label>
                  <Input
                    id="hr-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[35px] text-sm text-gray-500"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    title={showPassword ? "Hide password" : "Show password"} // Added title for extra clarity
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Log in"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
