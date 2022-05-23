import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { Alert, FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert } = useAppContext()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }
    console.log(values)
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
     <Wrapper className="full-page">
       <form className="form" onSubmit={onSubmit}>
         <Logo/>
         <h3>{values.isMember ? "Login" : "Register"}</h3>
         {showAlert && <Alert/>}
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
