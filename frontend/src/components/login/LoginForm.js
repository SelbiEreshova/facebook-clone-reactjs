import { Formik, Form } from "formik";
import LoginInput from "../../components/inputs/loginInputs";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import DotLoader from "react-spinners/DotLoader";

import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const loginInfos = {
  email: "",
  password: "",
};
export default function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  console.log(login);
  const handleLoginOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setLogin({ ...login, [name]: value });
    console.log(value);
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required(`Email address  is required`)
      .email(`Must be a valid email`)
      .max(100),
    password: Yup.string().required("Passwrod is required"),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
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
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginOnChange}
                  bottom={false}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginOnChange}
                  bottom={true}
                />
                <button type="submit" name="password " className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/reset" className="forget_password">
            Forgot password?
          </Link>
          <DotLoader color="#1876f2" loading={loading} size={30} />
          {error && <div className="error_text">{error}</div>}

          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_sign_up"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="" className="sign_extra ">
          <b>Create a Page</b> for a celebrity, brand or business
        </Link>
      </div>
    </div>
  );
}
