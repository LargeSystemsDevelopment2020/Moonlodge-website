import React, { useEffect, useState } from 'react'
import hotelData from './rooms.json'
import { Menu, Dropdown, Button, message } from 'antd'
import styled from 'styled-components'
import DayPicker from 'react-day-picker'

import 'react-day-picker/lib/style.css'

const Container = styled.div`
  margin: 50px 30% 0px 30%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const FormStep = styled.div`
  align-self: center;
  margin-top: 20px;
`

export default function Book() {
  const [hotel, setHotel] = useState(undefined)
  const [room, setRoom] = useState(undefined)
  const [starts, setStarts] = useState(undefined)
  const [ends, setEnds] = useState(undefined)
  const [step, setSetp] = useState(undefined)

  const disableSubmit = () =>
    starts === undefined ||
    ends === undefined ||
    starts === undefined ||
    room === undefined ||
    hotel === undefined

  const onDayClick = (day, { selected, disabled }) => {
    if (disabled) {
      return
    }
    console.log(day)
    if (day === starts || day === ends) {
      setStarts(day)
      setEnds(undefined)
    } else if (day < starts) {
      setEnds(undefined)
      setStarts(day)
    } else if (starts) {
      setEnds(day)
    } else {
      setStarts(day)
    }
  }

  const submit = () => {
    message.success('Reservation created')
  }

  const hotelMenu = (
    <Menu>
      <Menu.Item key="choose-hotel">
        <Button
          onClick={() => {
            setHotel(undefined)
            setSetp(1)
          }}
          style={{ width: '100%' }}
        >
          {'Vælg hotel'}
        </Button>
      </Menu.Item>
      {Object.keys(hotelData.hotels).map((hotelName) => {
        return (
          <Menu.Item key={hotelName}>
            <Button
              onClick={() => {
                setHotel(hotelName)
                setSetp(2)
              }}
              style={{ width: '100%' }}
            >
              {hotelName}
            </Button>
          </Menu.Item>
        )
      })}
    </Menu>
  )

  const roomMenu = step > 1 && (
    <Menu>
      <Menu.Item key="choose-room">
        <Button
          onClick={() => {
            setRoom(undefined)
            setSetp(2)
          }}
          style={{ width: '100%' }}
        >
          Vælg værelse
        </Button>
      </Menu.Item>
      {hotelData.hotels[hotel].rooms.map((room) => {
        return (
          <Menu.Item key={room.roomNumber}>
            <Button
              onClick={() => {
                setRoom(room.roomNumber)
                setSetp(3)
              }}
              style={{ width: '100%' }}
            >
              {room.roomNumber}
            </Button>
          </Menu.Item>
        )
      })}
    </Menu>
  )

  return (
    <Container>
      <FormStep>
        <Dropdown overlay={hotelMenu} placement="bottomCenter">
          <Button style={{ width: '150px' }}>
            {hotel ? hotel : 'Vælg hotel'}
          </Button>
        </Dropdown>
      </FormStep>
      {step > 1 && (
        <>
          <FormStep>
            <Dropdown overlay={roomMenu} placement="bottomCenter">
              <Button style={{ width: '150px' }}>
                {room ? room : 'Vælg værelse'}
              </Button>
            </Dropdown>
          </FormStep>
          <FormStep>
            <DayPicker
              disabledDays={{
                before: new Date()
              }}
              showOutsideDays
              showWeekNumbers
              selectedDays={
                ends === undefined ? starts : { from: starts, to: ends }
              }
              onDayClick={onDayClick}
              todayButton="Go to Today"
              modifiers={{
                foo: new Date()
              }}
              onTodayButtonClick={(day, modifiers) =>
                console.log(day, modifiers)
              }
            />
          </FormStep>
          <FormStep>
            <Button disabled={disableSubmit()} onClick={() => submit()}>
              Submit
            </Button>
          </FormStep>
        </>
      )}
    </Container>
  )
}
