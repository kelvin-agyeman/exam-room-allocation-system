import { LogIn } from "lucide-react";
import { Link } from "lucide-react";
import { Link as RouterLink } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const Route = {
  component: StaffLoginPage,
};

export function StaffLoginPage() {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const res = await customFetch.post("/auth/staff/login", data);
      return res.data;
    },

    onSuccess: (data) => {
      // console.log("Login success:", data);
      toast.success("Login successful");
      navigate({ to: "/staff/dashboard" });
    },

    onError: (error) => {
      // console.error(error);
      // alert("Invalid credentials");
      const errorMessage =
        error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    loginMutation.mutate(data);
  };

  return (
    <div className="stud-index-page">
      <form className="form" onSubmit={handleSubmit}>
        <div className="header">
          <h2>Staff Login</h2>
          <p className="subtext">
            Enter your staff ID and password to access your dashboard
          </p>
        </div>
        <div className="form-content">
          <div className="formcon">
            <label htmlFor="Staff ID">Staff ID</label>
            <input
              className="forminp"
              type="text"
              id="staffID"
              name="staffID"
              placeholder="e.g abc123"
            />
          </div>
          <div className="formcon">
            <div className="passlabel">
              <label htmlFor="Password">Password</label>
            </div>
            <input
              className="forminp"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className="footer">
          <button
            type="submit"
            className="formbtn"
            disabled={loginMutation.isPending}
          >
            <LogIn /> {loginMutation.isPending ? " Logging in..." : " Log In"}
          </button>
          <p>
            Don't have an account?{" "}
            <span style={{ color: "#2aa198" }}>Contact Admin</span>
          </p>
        </div>
      </form>
    </div>
  );
}
