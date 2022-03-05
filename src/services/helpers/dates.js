import moment from 'moment'

const manageDate = (date) => {
  return moment.utc(date).format('DD/MM/YYYY')
}

export const manageInputDate = (date) => moment.utc(date).format('YYYY-MM-DD')

export default manageDate
