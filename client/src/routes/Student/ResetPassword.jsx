import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const Route = {
  component: ResetPasswordPage,
};

export function ResetPasswordPage() {
  const navigate = useNavigate();

  const search = useSearch({ from: "/student/reset-password" });

  const token = search.token;
  const email = search.email;

  const resetPasswordMutation = useMutation({
    mutationFn: async (data) => {
      const payload = {
        ...data,
        token,
        email,
      };

      const res = await customFetch.post("/auth/reset-password", payload);
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

    resetPasswordMutation.mutate(data);
  };

  return (
    <div className="stud-index-page">
      <form className="form" onSubmit={handleSubmit}>
        <div className="header">
          <h2>Reset Password</h2>
          <p className="subtext">Enter new passsword to reset it</p>
        </div>
        <div className="form-content">
          <div className="formcon">
            <label htmlFor="Password">New Password</label>
            <input
              className="forminp"
              type="text"
              id="password"
              name="password"
              placeholder="Enter new password"
            />
          </div>
        </div>
        <div className="footer">
          <button
            type="submit"
            className="formbtn"
            disabled={resetPasswordMutation.isPending}
          >
            {resetPasswordMutation.isPending
              ? "Resetting..."
              : " Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
