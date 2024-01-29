import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/forgotpassword', { email, answer, newpassword });
      const msg = res.data.message;
      if (res && res.data.success) {
        toast.success("Password Reset Successfully")
        navigate('/login');
      }
      else toast.warn(msg);
    } catch (error) {
      toast.warn("Error while resetting the Password!");
      console.log(error);
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>FORGOT PASSWORD</Title>
        <Form>
          <Input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
          <Input type="text" placeholder="Your's Pet Name" onChange={(e) => { setAnswer(e.target.value) }} />
          <Input type="password" placeholder="New Password" onChange={(e) => { setNewPassword(e.target.value) }} />
          <Button onClick={handleSubmit}>UPDATE</Button>
          <Link href="/register">BACK TO REGISTRATION WINDOW</Link>
          <ToastContainer />
        </Form>
      </Wrapper>
    </Container>
  );
};


export default ForgotPassword;