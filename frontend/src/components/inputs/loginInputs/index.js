import "./style.css";
import { useField } from "formik";
export default function LoginInput({ placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      <input
        type={field.type}
        placeholder={placeholder}
        name={field.name}
        {...field}
        {...props}
      ></input>
    </div>
  );
}
