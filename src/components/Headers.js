import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Flex, Image, Text } from '@chakra-ui/react'
import { Drawer } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import logo from '../assets/logo.png'
import { Icon } from '@iconify/react'

const Headers = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  
  const showDrawer = () => setOpen(true)
  const onClose = () => setOpen(false)
  const handleJumpHome = () => navigate('/')
  
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/explore-species', label: 'Explore Species' },
    { to: '/take-action', label: 'Take Action' },
    { to: '/email', label: 'Email' }
  ]
  
  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        bg="#07431E"
        h="80px"
        px="24px"
        position="sticky"
        top="0"
        zIndex="2"
      >
        <Flex
          align="center"
          cursor="pointer"
          onClick={handleJumpHome}
          ml="8px"
        >
          <Image
            src={logo}
            alt="logo"
            boxSize="48px"
            mr="12px"
            ml="40px"
          />
          <Text
            fontSize="30px"
            fontWeight="bold"
            color="white"
            ml="4px"
            mt="25px"
          >
            WildLinky
          </Text>
        </Flex>
        
        <div onClick={showDrawer} style={{ cursor: 'pointer', padding: '8px' }}>
          <Icon icon="mdi:menu" width="28" color="#fff" />
        </div>
      </Flex>
      
      <Drawer
        title=""
        placement="right"
        onClose={onClose}
        open={open}
        key="right"
        closeIcon={<CloseOutlined style={{ fontSize: 24 }} />}
        contentWrapperStyle={{ width: '320px', maxWidth: '100%' }}
        bodyStyle={{ padding: 0, backgroundColor: '#f9f5f0' }}
        headerStyle={{ backgroundColor: '#f9f5f0', padding: '16px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {navItems.map((item, index) => {
            const isActive = location.pathname === item.to;
            const textColor = isActive ? '#f6c948' : '#07431E';

            return (
              <React.Fragment key={item.to}>
                <Link
                  to={item.to}
                  onClick={onClose}
                  style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '24px 16px',
                    }}
                  >
                    <span
                      style={{
                        color: textColor,
                        fontSize: '28px',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.label}
                    </span>
                    <Icon
                      icon="mdi:arrow-right"
                      style={{
                        color: textColor,
                        width: '24px',
                        height: '24px',
                      }}
                    />
                  </div>
                </Link>

                <div
                  style={{
                    height: '1px',
                    backgroundColor: '#e0e0e0',
                    margin: '0 16px',
                  }}
                />
              </React.Fragment>
            );
          })}
        </div>
      </Drawer>
    </>
  )
}

export default Headers