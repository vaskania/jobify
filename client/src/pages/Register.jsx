import { useState, useEffect } from "react";
import { Alert, FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  showAlert: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {values.showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            labelText="name"
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          labelText="email"
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          labelText="password"
          handleChange={handleChange}
        />
        <button className="btn btn-block" type="submit">
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button className="member-btn" type="button" onClick={toggleMember}>
            {values.isMember ? "Register" : "login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
