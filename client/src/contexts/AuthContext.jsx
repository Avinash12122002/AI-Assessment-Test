import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialized = useRef(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState(""); // Still storing role for state management

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setRole(parsedUser.role); // Keep role for internal logic
        }
      } catch (err) {
        console.error("Error reading user from localStorage:", err);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", user.token);
      } catch (err) {
        console.error("Error updating localStorage:", err);
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  // ✅ Register user (For Candidate only)
  const register = async (name, email, password) => {
    setLoading(true);
    setError("");

    const URL = "http://localhost:3000/api/auth/register";

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "candidate" }), // Hardcoded role as "candidate"
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        setError(data.message || "Registration failed.");
        return { success: false, error: data.message };
      }
    } catch (err) {
      setError("Something went wrong.");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login with role validation (no changes needed here)
  const login = async (email, password, expectedRole) => {
    setLoading(true);
    setError("");

    const URL = "http://localhost:3000/api/auth/login";

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role !== expectedRole) {
          const errorMsg =
            expectedRole === "hr"
              ? "You are not authorized to log in as HR."
              : "You are not authorized to log in as a Candidate.";
          setError(errorMsg);
          return { success: false, error: errorMsg };
        }

        const loggedInUser = {
          email: data.email,
          role: data.role,
          token: data.token,
        };
        setUser(loggedInUser);
        setRole(data.role);
        localStorage.setItem("token", data.token);

        return { success: true, role: data.role };
      } else {
        setError(data.message || "Login failed.");
        return { success: false, error: data.message };
      }
    } catch (err) {
      setError("Something went wrong.");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Contact function – only Candidate allowed
  const contact = async (name, email, message) => {
    setLoading(true);
    setError("");

    // Block HR users from sending messages
    if (role !== "candidate") {
      const errorMessage = "You are not authorized person";
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }

    const URL = "http://localhost:3000/api/auth/contact";

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        const errMsg = data.error || data.message || "Submission failed.";
        setError(errMsg);
        return { success: false, error: errMsg };
      }
    } catch (err) {
      setError("Something went wrong.");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setRole("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        login,
        register,
        contact,
        logout,
        role,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
