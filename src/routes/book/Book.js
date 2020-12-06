import React, { useState } from 'react'
import { Input, message, Tag, Dropdown, Menu, Button, Table } from 'antd'
import styled from 'styled-components'
import DayPicker from 'react-day-picker'
import { getVacantRooms } from '../../api/requests/rooms'
import { bookRooms } from '../../api/requests/booking'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import 'react-day-picker/lib/style.css'

const Container = styled.div`
  margin: 50px 30px 0px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const FormStep = styled.div`
  width: 300px;
  align-self: center;
  margin-top: 20px;
`

export default function Book() {
  const [city, setCity] = useState('Vælg en by')
  const [starts, setStarts] = useState(undefined)
  const [ends, setEnds] = useState(undefined)
  const [activeStep, setActiveStep] = useState(1)
  const [numberOfGuests, setNumberOfGuests] = useState(0)
  const [amountOfRooms, setAmountOfRooms] = useState(0)
  const [rooms, setRooms] = useState(undefined)
  const [chosenRooms, setChosenRooms] = useState([])
  const [passportNumber, setPassportNumber] = useState('')
  const [arrivalsLate, setArrivalsLate] = useState(0)

  const history = useHistory()

  console.log('herman', moment(starts).unix())
  const goToStep1 = () => {
    setRooms(undefined)
    setActiveStep(1)
  }

  const book = async () => {
    const roomsToBook = rooms.filter((room) => chosenRooms.includes(room.id))

    const formatedRooms = roomsToBook.map((room, i) => {
      return {
        dateofArrival: moment(starts).unix(),
        dateofDeparture: moment(ends).unix(),
        roomID: room.id,
        roomType: room.roomType,
        price: room.price,
        maxCapacity: room.maxCapacity,
        id: i + 1
      }
    })
    console.log('request', {
      rooms: formatedRooms,
      passportNumber,
      dateFrom: moment(starts).unix(),
      dateTo: moment(ends).unix(),
      arrivalIsLate: arrivalsLate
    })
    const response = await bookRooms(
      formatedRooms,
      passportNumber,
      moment(starts).unix(),
      moment(ends).unix(),
      arrivalsLate
    )
    if (response.status === 200) {
      message.success(`Du har nu booket ${chosenRooms.length} værelser på `)
      history.push('')
      console.log(response.payload)
    } else {
      message.error('Der gik noget galt!')
    }
  }

  const getRooms = async () => {
    const response = await getVacantRooms(
      city === 'Alle' ? '%' : city,
      moment(starts).unix(),
      moment(ends).unix,
      numberOfGuests,
      amountOfRooms
    )
    if (response.status === 200) {
      setRooms(response.payload)
      setActiveStep(2)
    } else {
      message.error('Der er gået noget galt')
    }
  }

  const getRoomsButtonDisabled = () => {
    return (
      city === 'Vælg en by' ||
      starts === undefined ||
      ends === undefined ||
      numberOfGuests === 0 ||
      numberOfGuests === undefined ||
      amountOfRooms === 0 ||
      amountOfRooms === undefined
    )
  }
  const onDayClick = (day, { disabled }) => {
    if (disabled) {
      return
    }
    if (!starts) {
      setStarts(day)
    } else if (starts && !ends) {
      if (day < starts) {
        setEnds(starts)
        setStarts(day)
      } else {
        setEnds(day)
      }
      return
    } else if (day < starts) {
      setStarts(day)
    } else {
      setEnds(day)
    }
  }

  const reservationColumns = [
    {
      title: 'Valgt',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Input
          type="checkbox"
          checked={chosenRooms.indexOf(id) !== -1}
          onChange={() => {
            const roomIndex = chosenRooms.indexOf(id)
            const roomsCopy = [...chosenRooms]
            if (roomIndex === -1) {
              roomsCopy.push(id)
            } else {
              roomsCopy.splice(roomIndex, 1)
            }
            setChosenRooms(roomsCopy)
          }}
        />
      )
    },
    { title: 'Kapacitet', dataIndex: 'maxCapacity', key: 'id' },
    { title: 'Rumtype', dataIndex: 'roomType', key: 'id' },
    {
      title: 'Hotel',
      dataIndex: '',
      key: 'id',
      render: (room) => {
        return room.hotel.name
      }
    },
    {
      title: 'Addresse',
      dataIndex: '',
      key: 'id',
      render: (room) => {
        return room.hotel.address
      }
    },
    {
      title: 'Distance til center',
      dataIndex: '',
      key: 'id',
      render: (room) => {
        return room.hotel.distanceToCenter
      }
    },
    {
      title: 'Vurdering',
      dataIndex: '',
      key: 'id',
      render: (room) => {
        return room.hotel.rating
      }
    },
    { title: 'Pris', dataIndex: 'price', key: 'id' },
    {
      title: 'Maks gæster',
      dataIndex: 'maxCapacity',
      key: 'id'
    }
  ]
  return (
    <div>
      {activeStep === 1 && (
        <Container>
          <div>
            <FormStep>
              <Tag>By</Tag>
              <div>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <Button
                          style={{ width: '100%' }}
                          onClick={() => setCity('Vælg en by')}
                        >
                          Vælg en by
                        </Button>
                      </Menu.Item>
                      <Menu.Item>
                        <Button
                          style={{ width: '100%' }}
                          onClick={() => setCity('Alle')}
                        >
                          Alle
                        </Button>
                      </Menu.Item>
                      <Menu.Item>
                        <Button
                          style={{ width: '100%' }}
                          onClick={() => setCity('Lyngby')}
                        >
                          Lyngby
                        </Button>
                      </Menu.Item>
                      <Menu.Item>
                        <Button
                          style={{ width: '100%' }}
                          onClick={() => setCity('Berlin')}
                        >
                          Berlin
                        </Button>
                      </Menu.Item>
                      <Menu.Item>
                        <Button
                          style={{ width: '100%' }}
                          onClick={() => setCity('Helsinki')}
                        >
                          Helsinki
                        </Button>
                      </Menu.Item>
                      <Menu.Item>
                        <Button
                          style={{ width: '100%' }}
                          onClick={() => setCity('Stockholm')}
                        >
                          Stockholm
                        </Button>
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomCenter"
                  arrow
                >
                  <Button style={{ width: '150px' }}>{city}</Button>
                </Dropdown>
              </div>
            </FormStep>
            <FormStep>
              <Tag>Antal gæster</Tag>
              <Input
                type="number"
                value={numberOfGuests}
                onChange={(e) => {
                  const { value } = e.target
                  if (value > 5) {
                    message.warning('Der kan maks vælges 5 gæster')
                    setNumberOfGuests(5)
                  } else {
                    setNumberOfGuests(e.target.value)
                  }
                }}
              />
            </FormStep>
            <FormStep>
              <Tag>Antal rum</Tag>
              <Input
                type="number"
                value={amountOfRooms}
                onChange={(e) => {
                  const { value } = e.target
                  if (value > 5) {
                    message.warning('Der kan maks vælges 5 rum')
                    setAmountOfRooms(5)
                  } else {
                    setAmountOfRooms(e.target.value)
                  }
                }}
              />
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
                todayButton="Ryd valgte datoer"
                onTodayButtonClick={() => {
                  setStarts(undefined)
                  setEnds(undefined)
                }}
              />
            </FormStep>
            <FormStep>
              <Button disabled={getRoomsButtonDisabled()} onClick={getRooms}>
                Find ledige lokaler
              </Button>
            </FormStep>
          </div>
        </Container>
      )}
      {activeStep === 2 && (
        <div>
          <Button
            style={{ width: '200px', marginBottom: '10px' }}
            onClick={() => {
              goToStep1()
            }}
          >
            Tilbage
          </Button>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '30px 0px 20px 0px',
              alignContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Tag style={{ marginRight: '120px' }}>Pasnummer</Tag>
            <Input
              style={{ width: '200px', marginBottom: '20px' }}
              onChange={(e) => setPassportNumber(e.target.value)}
              value={passportNumber}
            />
            <Tag style={{ marginRight: '80px' }}>Ankommer du sent?</Tag>
            <Input
              style={{ marginTop: '5px' }}
              type="checkbox"
              onChange={() => setArrivalsLate(!arrivalsLate)}
            />
          </div>
          <Table columns={reservationColumns} dataSource={rooms} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ width: '200px' }}
              disabled={chosenRooms.length === 0 || passportNumber.length < 5}
              onClick={book}
            >
              Book
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
