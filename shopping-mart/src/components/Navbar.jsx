import React from 'react'
import { styled } from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';
import Badge from '@mui/material/Badge';
import { mobile } from "../Responsive"
import { useNav } from './context/nav';


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "0px" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "20px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Navbar = () => {
  const [nav, setNav] = useNav(false);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language> EN </Language>
          <SearchContainer>
            <Input placeholder='Search' />
            <SearchIcon style={{ color: "gray", fontSize: "12px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo> SHOPPING MART</Logo>
        </Center>
        <Right>
          {
            nav ? (<><div style={{ cursor: "pointer" }} onClick={() => { setNav(false); localStorage.setItem('nav', false); }}>Log Out</div></>) : (<><a href='/register'> <MenuItem>REGISTER</MenuItem> </a>
              <a href='/login'> <MenuItem>LOGIN</MenuItem></a></>)
          }
          <a href='/cart'><MenuItem>
            <Badge badgeContent={2} color="primary"><ShoppingCartCheckoutSharpIcon /></Badge>
          </MenuItem></a>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
