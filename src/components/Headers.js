import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Flex, Image, Text } from '@chakra-ui/react'
import { Drawer } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import logo from '../assets/logo.png'
import { Icon } from '@iconify/react'
import NavDropdown from './NavDropdown'

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
};
const Headers = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const width = useWindowWidth();
  const isMobile = width < 768;

  const showDrawer = () => setOpen(true)
  const onClose = () => setOpen(false)
  const handleJumpHome = () => navigate('/')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    {
      title: 'What’s happening',
      items: [
        { to: '/forest-habitat', label: 'Forest habitat' },
        { to: '/explore-species', label: 'Explore species' },
      ]
    },
    {
      title: 'Policy & Protection', 
      items: [
        { to: '/policy', label: 'Policy' },
      ]
    },
    {
      title: 'Take action',
      items: [
        { to: '/email', label: 'Write an email' },
        { to: '/your-way', label: 'Do it your way' },
      ]
    }
  ]

  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        bg={isScrolled ? '#1d4022' : 'transparent'}
        transition="background-color 0.3s ease"
        h="80px"
        px="24px"
        position="fixed"
        top="0"
        width="100%"
        zIndex="999"
      >
        <Flex align="center" cursor="pointer" onClick={handleJumpHome} ml="8px">
          <Image src={logo} alt="logo" boxSize="48px" mr="12px" ml="40px" />
          <Text fontSize="30px" fontWeight="bold" color="white" ml="4px" mt="25px">
            WildLinky
          </Text>
        </Flex>

        {!isMobile && (
          <Flex gap="32px" mr="40px">
            <Link
              to="/"
              style={{
                color: location.pathname === '/' ? '#f6c948' : 'white',
                fontWeight: '800',
                fontSize: '20px',
                textDecoration: 'none',
                padding: '8px'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#f6c948')}
              onMouseLeave={(e) => {
                if (location.pathname !== '/') e.target.style.color = 'white';
              }}
            >
              Home
            </Link>

            <NavDropdown
              title="What’s happening"
              items={navItems[0].items}
              active={navItems[0].items.some(item => location.pathname.startsWith(item.to))}
            />

            <Link
              to="/policy"
              style={{
                color: location.pathname === '/policy' ? '#f6c948' : 'white',
                fontWeight: '800',
                fontSize: '20px',
                textDecoration: 'none',
                padding: '8px'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#f6c948')}
              onMouseLeave={(e) => {
                if (location.pathname !== '/policy') e.target.style.color = 'white';
              }}
            >
              Policy & Protection
            </Link>

            <NavDropdown
              title="Take action"
              items={navItems[2].items}
              active={navItems[2].items.some(item => location.pathname.startsWith(item.to))}
            />
          </Flex>
        )}

        {isMobile && (
          <div onClick={showDrawer} style={{ cursor: 'pointer', padding: '8px', marginRight: '40px' }}>
            <Icon icon="mdi:menu" width="28" color="#fff" />
          </div>
        )}
      </Flex>

      <Drawer
        title=""
        placement="right"
        onClose={onClose}
        open={open}
        key="right"
        closeIcon={<CloseOutlined style={{ fontSize: 24 }} />}
        contentWrapperStyle={{ width: "320px", maxWidth: "100%" }}
        bodyStyle={{ padding: 0, backgroundColor: "#f9f5f0" }}
        headerStyle={{ backgroundColor: "#f9f5f0", padding: "16px" }}
      >
        <div className="menu-container">
          {[{ group: 'Home', items: [{ to: '/', label: 'Home' }] }, ...navItems].map((group, index) => (
            <div key={index} className="menu-item-container">
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#07431E',
                padding: '24px 16px 8px'
              }}>
                {group.title || group.group}
              </div>
              {group.items.map((item) => {
                const isActive = location.pathname === item.to
                const textColor = isActive ? '#f6c948' : '#07431E'
                return (
                  <Link key={item.to} to={item.to} onClick={onClose} style={{ textDecoration: 'none' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px'
                    }}>
                      <span style={{
                        fontSize: '22px',
                        color: textColor,
                        paddingLeft: '16px',
                        flex: 1
                      }}>
                        {item.label}
                      </span>
                      <Icon icon="mdi:arrow-right" style={{
                        color: textColor,
                        width: '22px',
                        height: '22px'
                      }} />
                    </div>
                  </Link>
                )
              })}
              <div style={{
                height: '1px',
                backgroundColor: '#e0e0e0',
                margin: '0 16px 12px'
              }} />
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Headers
