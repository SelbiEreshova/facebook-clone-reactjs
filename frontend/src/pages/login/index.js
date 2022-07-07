import "./style.css";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInputs";
import { useState } from "react";
const loginInfos = {
  email: "",
  password: "",
};
export default function Login() {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  console.log(login);
  const handleLoginOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setLogin({ ...login, [name]: value });
    console.log(value);
  };
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg"></img>
            <span>
              Facebook helps you connect and share with people in your life
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik
                enableReinitialize
                initialValues={{
                  email,
                  password,
                }}
              >
                {(formik) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="email"
                      placeholder="Email address or phone number"
                      onChange={handleLoginOnChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleLoginOnChange}
                    />
                    <button type="submit" name="password " className="blue_btn">
                      Log In
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to="/forgot" className="forget_password">
                Forgot password?
              </Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_sign_up">Create Account</button>
            </div>
            <Link to="" className="sign_extra ">
              <b>Create a Page</b>
              for a celebrity, brand or business
            </Link>
          </div>
        </div>
        <div className="register"></div>
      </div>
    </div>
  );
}
