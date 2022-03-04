import moment from 'moment'

const manageDate = (date) => {
  return moment.utc(date).format('DD/MM/YYYY')
}

export default manageDate
