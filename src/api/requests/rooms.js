import request from '../request'

/**
 * @param {string} city
 * @param {number} dateFrom
 * @param {number} dateTo
 * @param {number} numberOfGuests
 * @param {number} numberOfRooms
 */
export async function getVacantRooms(
  city,
  dateFrom,
  dateTo,
  numberOfGuests,
  numberOfRooms
) {
  return request('rooms', {
    method: 'POST',
    body: {
      city,
      dateFrom,
      dateTo,
      numberOfGuests,
      numberOfRooms
    }
  })
}
