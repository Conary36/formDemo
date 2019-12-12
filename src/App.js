import React,{useState} from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import logo from './logo.svg';
import './App.css';

function LoginForm({values, errors, touched}) {
  // const [user, setUser] = useState({ username: "", password: "" });

  // const handleChange = event => {
  //   setUser({ ...user, [event.target.name]: event.target.value });
  // };

  // const handleSubmit = event => {
  //   event.preventDefault();
  //   console.log(user.username);
  //   console.log(user.password);
  // };
  
  return (
    <div className="loginForm">
      <Form>
        Username:
        <div>
          {touched.email && errors.email && <p>{errors.email}</p>}
          <Field type="email" name="email" placeholder="Email" />
        </div>
        Password:
        <div>
          {touched.password && errors.password && <p>{errors.password}</p>}
          <Field type="password" name="password" placeholder="Password" />
        </div>
        <Field component="select" name="meal">
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="platinum">Platinum</option>
        </Field>
        <label>
          <Field type="checkbox" name="tos" checked={values.tos} />
          Accept TOS
        </label>
        <button>Submit!</button>
      </Form>
    </div>
  );
}
const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password, tos, meal}) {
    return {
      email: email || "",
      tos: tos || false,
      meal: meal || "silver",
      username: email || "",
      password: password || ""
    };
  },
  //======VALIDATION SCHEMA==========
  vvalidationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required")
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
    console.log(values);
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
    if(values.email === 'cbeckford144@gmail.com'){
      setErrors({email: 'That email is already taken'});
    }else{
      axios
      .post("https://yourdatabaseurlgoeshere.com", values)
      .then(res =>{
        console.log(res);
        resetForm();
        setSubmitting(false);
      })
      .catch(err=>{
        console.log(err);
        setSubmitting(false);
      });
    }
  }
})(LoginForm);



export default FormikLoginForm;
