import React, { useEffect, useState } from 'react'
import { Input, message, Table, Button, Tag } from 'antd'
import styled from 'styled-components'
import DayPicker from 'react-day-picker'
import {
  getReservationsByPassportNumber,
  deleteReservationById
} from '../../api/requests/booking'
import moment from 'moment'

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

export default function Reservations() {
  const [passportNunmber, setPassportNumber] = useState('')
  const [reservations, setReservations] = useState(undefined)

  const deleteReservation = async (reservationId) => {
    const response = await deleteReservationById(reservationId)
    if (response.status === 200) {
      message.success('Reservation blev slettet')
      const reservationsCopy = [...reservations]
      const reservationIndexToDelete = reservationsCopy.findIndex(
        (reservation) => reservation.id === reservationId
      )
      reservationsCopy.splice(reservationIndexToDelete, 1)
      setReservations(reservationsCopy)
    } else {
      message.error('noget gik galt!')
    }
  }

  const getReservations = async () => {
    const response = await getReservationsByPassportNumber(passportNunmber)
    if (response.status === 200) {
      if (response.payload.length === 0) {
        message.warning('Der er ingen reservationer på passet')
      } else {
        message.success('Fik fat i reservationerne')
      }
      setReservations(response.payload)
    } else {
      message.error('der er ingen reservation under pasnummeret')
    }
  }
  const reservationColumns = [
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
    {
      title: 'Slet',
      dataIndex: 'id',
      key: 'id',
      render: (e) => (
        <Button danger onClick={() => deleteReservation(e)}>
          Slet reservation
        </Button>
      )
    }
  ]

  const roomColumns = [
    {
      title: 'Starter',
      dataIndex: 'dateofArrival',
      key: 'id',
      render: (e) => {
        return moment(e).format('DD/MM/YYYY')
      }
    },
    {
      title: 'Slutter',
      dataIndex: 'dateofDeparture',
      key: 'id',
      render: (e) => {
        return moment(e).format('DD/MM/YYYY')
      }
    },
    { title: 'Pris', dataIndex: 'price', key: 'id' },
    {
      title: 'Maks gæster',
      dataIndex: 'maxCapacity',
      key: 'id'
    },
    { title: 'Kapacitet', dataIndex: 'maxCapacity', key: 'id' },
    { title: 'Rumtype', dataIndex: 'roomType', key: 'id' }
  ]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '300px',
          alignSelf: 'center',
          justifySelf: 'center'
        }}
      >
        <Tag>Pasnummer</Tag>
        <Input
          style={{ marginBottom: '10px' }}
          onChange={(e) => setPassportNumber(e.target.value)}
          value={passportNunmber}
        />
        <Button
          disabled={passportNunmber.length < 6}
          style={{ marginLeft: '75px' }}
          onClick={getReservations}
        >
          Få reservationer
        </Button>
      </div>
      {reservations !== undefined && (
        <Table
          columns={reservationColumns}
          sticky
          expandable={{
            expandedRowRender: (record) => {
              console.log(record)
              return (
                <Table
                  columns={roomColumns}
                  dataSource={record.rooms}
                  pagination={false}
                />
              )
            },
            rowExpandable: (record) => {
              return record.rooms.length > 0
            }
          }}
          dataSource={reservations}
        />
      )}
    </div>
  )
}
