import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../components/context/auth";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  if(auth?.user) 
    navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login', { email, password });
      const msg = res.data.message;
      if (res && res.data.success) {
        toast.success("Login Successfully")
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        const savedata = JSON.stringify({ user: res.data.user, token: res.data.token })
        localStorage.setItem('auth', savedata);
        navigate('/');
      }
      else toast.warn(msg);
    } catch (error) {
      toast.warn("Error in Login Window!");
      console.log(error);
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
          <Input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
          <Button onClick={handleSubmit}>LOGIN</Button>
          <Link href="/forgotpassword">DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link href="/register">CREATE A NEW ACCOUNT</Link>
          <ToastContainer />
        </Form>
      </Wrapper>
    </Container>
  );
};


export default Login;