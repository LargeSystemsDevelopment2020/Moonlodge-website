import React, { useEffect, useState } from 'react'
import hotelData from './rooms.json'
import { Menu, Dropdown, Button, Space } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  margin: 50px 30% 0px 30%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const FormStep = styled.div``

export default function Book() {
  const [hotel, setHotel] = useState('Vælg hotel')
  const [room, setRoom] = useState(undefined)
  const [starts, setStarts] = useState(undefined)
  const [ends, setEnds] = useState(undefined)

  const hotelMenu = (
    <Menu>
      <Menu.Item key="choose-hotel">
        <Button
          onClick={() => setHotel('Vælg hotel')}
          style={{ width: '100%' }}
        >
          {'Vælg hotel'}
        </Button>
      </Menu.Item>
      {Object.keys(hotelData.hotels).map((hotelName) => {
        return (
          <Menu.Item key={hotelName}>
            <Button
              onClick={() => setHotel(hotelName)}
              style={{ width: '100%' }}
            >
              {hotelName}
            </Button>
          </Menu.Item>
        )
      })}
    </Menu>
  )

  return (
    <Container>
      <Dropdown overlay={hotelMenu} placement="bottomCenter">
        <Button style={{ width: '150px' }}>{hotel}</Button>
      </Dropdown>

      <p>Book</p>
    </Container>
  )
}
