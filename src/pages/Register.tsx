import { Link } from "react-router-dom";
import UserInfoForm from "../components/user/UserInfoForm";
import { RegisterType } from "../misc/userTypes";

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
    <div className="lg:w-1/2 mx-auto my-20 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold mb-8">Register</h1>
      <UserInfoForm userInfo={userInfo} mode="register" />
      <button className="btn-primary w-60">
        <Link to="/">Main Page</Link>
      </button>
    </div>
  );
}

export default Register;
