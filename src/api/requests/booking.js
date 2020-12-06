import request from '../request'

export const bookRooms = async (
  rooms,
  passportNumber,
  dateFrom,
  dateTo,
  arrivalIsLate
) => {
  return request('booking/', {
    method: 'POST',
    body: {
      rooms,
      passportNumber,
      dateFrom,
      dateTo,
      arrivalIsLate
    }
  })
}

export const getReservationsByPassportNumber = async (passportNumber) => {
  return request(`booking/${passportNumber}`)
}

export const deleteReservationById = async (id) => {
  return request(`booking/${id}`, { method: 'DELETE' })
}
