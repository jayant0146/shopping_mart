import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useScrollTrigger } from "@mui/material";
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
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-size: 16px;
&:hover {
    background-color: gray;
}
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');

  const navigate = useNavigate();
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function areAllCharactersNumbers(phone) {
    for (let i = 0; i < phone.length; i++) {
      if (isNaN(parseInt(phone[i]))) {
        return false;
      }
    }
    return true;
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); //To prevent refreshing everytime
    if (!isValidEmail(email) && email.length !== 0) toast.warn("Enter valid Email Address");
    else if ((!areAllCharactersNumbers(phone) || phone.length !== 10) && phone.length !== 0)
      toast.warn("Enter valid Phone");
    // if (phone.length !== 10 && phone.length !== 0) toast.warn("Enter valid Email Address");
    else {
      try {
        const res = await axios.post('/api/v1/auth/register', { name, email, password, phone, address, answer });
        const msg = res.data.message;
        if (res && res.data.success) {
          toast("Registered Successfully!");
          navigate('/login');
        }
        else toast.warn(msg);
      } catch (error) {
        toast("Error in Registration!");
        console.log(error);
      }
    }
  }

  return (<>
    <Container>

      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input type=" text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} required />
          <Input type="email" placeholder="EMail" onChange={(e) => { setEmail(e.target.value) }} required />
          <Input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} required />
          <Input type=" text" placeholder="Phone" onChange={(e) => { setPhone(e.target.value) }} required />
          <Input type=" text" placeholder="Address" onChange={(e) => { setAddress(e.target.value) }} required />
          <Input type=" text" placeholder="What's your pet name" onChange={(e) => { setAnswer(e.target.value) }} required />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b> <br /><br />
            <Link href="/login">ALREADY A USER ???</Link>
          </Agreement>
          <Button onClick={handleSubmit}>REGISTER</Button>
          <ToastContainer />
        </Form>
      </Wrapper>
    </Container></>
  );
};

export default Register;