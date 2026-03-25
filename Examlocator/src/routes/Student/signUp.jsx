import { UserPlus } from "lucide-react";
import { Link as RouterLink } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { LEVELS, PROGRAMS } from "../../../../utils/constants";

export const Route = {
  component: StudSignupPage,
};

export function StudSignupPage() {
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: async (data) => {
      const res = await customFetch.post("/auth/register", data);
      return res.data;
    },

    onSuccess: (data) => {
      // console.log("Login success:", data);
      toast.success("Registration successful");
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

    data.indexNumber = Number(data.indexNumber);
    data.level = Number(data.level);

    signUpMutation.mutate(data);
  };

  return (
    <div className="stud-signup-page">
      <form className="signupform" onSubmit={handleSubmit}>
        <div className="header">
          <h2>Student Registration</h2>
          <p className="subtext">
            Create your account to access the exam locator
          </p>
        </div>
        <div className="form-content-signup">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your active email"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="indexNumber">Index Number</label>
              <input
                type="text"
                id="indexNumber"
                name="indexNumber"
                placeholder="Enter your index number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="departmentCode">Department Code</label>
              <input
                type="text"
                id="departmentCode"
                name="departmentCode"
                placeholder="Enter department code"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="program">Program</label>
              <select id="level" name="program">
                <option value="">Select program</option>
                {Object.values(PROGRAMS).map((program) => {
                  return (
                    <option value={program} key={program}>
                      {program}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="level">Level</label>
              <select id="level" name="level">
                <option value="">Select level</option>
                {LEVELS.map((level) => {
                  return (
                    <option value={level} key={level}>
                      {level}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
            />
          </div>
        </div>
        <div className="footer">
          <button
            type="submit"
            className="formbtn"
            disabled={signUpMutation.isPending}
          >
            <UserPlus />{" "}
            {signUpMutation.isPending ? " Signing up..." : " Sign Up"}
          </button>
          <p>
            Already have an account?{" "}
            <RouterLink to="/student/login" className="forgotpass">
              Login here
            </RouterLink>
          </p>
        </div>
      </form>
    </div>
  );
}
