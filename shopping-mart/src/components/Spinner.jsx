import * as React from 'react';
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';

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

export default function Spinner({ path = "login" }) {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 &&
            navigate(`/${path}`, {
                state: location.pathname,
            });
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);


    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1>Redirecting to Login Page within {count} seconds...  </h1> <br />
                <CircularProgress />
            </Box>
        </Container>
    );
}
