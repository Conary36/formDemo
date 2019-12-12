import React,{useState} from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
// import logo from './logo.svg';
import './App.css';

function LoginForm({errors, touched}) {
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
          <Field type="password" name="password" placeholder="Password" />
        </div>
        <button>Submit!</button>
      </Form>
    </div>
  );
}
const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      username: email || "",
      password: password || ""
    };
  },
  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required()
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values) {
    console.log(values);
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
  }
})(LoginForm);



export default FormikLoginForm;
