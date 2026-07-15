import { Link as RouterLink } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const Route = {
  component: ForgotPasswordPage,
};

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data) => {
      const res = await customFetch.post("/auth/forgot-password", data);
      return res.data;
    },

    onSuccess: (data) => {
      // console.log("Login success:", data);
      toast.success(data.msg);
      navigate({ to: "/student/login" });
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

    forgotPasswordMutation.mutate(data);
  };

  return (
    <div className="stud-index-page">
      <form className="form" onSubmit={handleSubmit}>
        <div className="header">
          <h2>Forgot Password</h2>
          <p className="subtext">Enter your email to get reset password link</p>
        </div>
        <div className="form-content">
          <div className="formcon">
            <label htmlFor="Email">Email</label>
            <input
              className="forminp"
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email address"
            />
          </div>
        </div>
        <div className="footer">
          <button
            type="submit"
            className="formbtn"
            disabled={forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending
              ? "Sending link..."
              : " Get Reset Password Link"}
          </button>
          <p>
            Remember Password?{" "}
            <RouterLink to="/student/login" className="forgotpass">
              Back to Login
            </RouterLink>
          </p>
        </div>
      </form>
    </div>
  );
}
