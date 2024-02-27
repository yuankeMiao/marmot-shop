import { Link } from "react-router-dom";
import UserInfoForm from "../components/user/UserInfoForm";

function Register() {
  const userInfo = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    image: "",
  };

  return (
    <div className="h-screen dark:bg-gray-900">
      <div className="lg:w-1/2 mx-auto py-20 flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">Register</h1>
        <UserInfoForm userInfo={userInfo} mode="register" />
        <button className="btn-primary w-60">
          <Link to="/">Main Page</Link>
        </button>
      </div>
    </div>
  );
}

export default Register;
