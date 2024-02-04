import React from 'react'
import { styled } from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';
import Badge from '@mui/material/Badge';
import { mobile } from "../Responsive"
import { useAuth } from './context/auth';
import { Link } from 'react-router-dom';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 8px 6px -6px gray;
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
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding: 5px;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Dropdown = styled.a`
  position: relative;
  display: inline-block;
`

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index: 1;
  `


const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    })
    localStorage.removeItem('auth');
  }
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
            auth.user ? (<Dropdown><li>
              <Link to={`/dashboard/${auth.user.role === 0 ? "user" : "admin"} `}> DASHBOARD</Link></li>
              <li onClick={handleLogout}><a href='/'>LOGOUT</a></li>
            </Dropdown>)
              : (<><a href='/register'> <MenuItem>REGISTER</MenuItem> </a> <a href='/login'> <MenuItem>LOGIN</MenuItem></a></>)
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
