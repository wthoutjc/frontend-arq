import { useState, useEffect } from 'react'

// Components
import Table from '../../../table/table'
import LoadingServer from '../../../loaders/loadingServer'
import AdminSeeImage from './adminSeeImage'

// Hook
import useAlert from '../../../../hooks/useAlert'

// Helpers
import manageDate from '../../../../services/helpers/dates'

const AdminAlertas = () => {
  const [render, setRender] = useState(false)

  const { getAlerts } = useAlert()

  const [contentTable, setContentTable] = useState({
    columns: ['ID', 'Fecha', 'Ver'],
    rows: [['Cargando datos...']],
  })

  useEffect(() => {
    getAlerts({ setRender }).then((res) => {
      setContentTable({
        columns: ['ID', 'Fecha', 'Ver'],
        rows: Array.isArray(res[0])
          ? res[0]?.map((data) => {
              return [
                data[0],
                manageDate(data[1]),
                <AdminSeeImage key={data[0]} infoAlert={data} />,
              ]
            })
          : [[res]],
      })
    })
  }, [getAlerts])

  return (
    <>
      <LoadingServer render={render} />
      <div className="table-container">
        <Table contentTable={contentTable} style={'table-admin'} />
      </div>
    </>
  )
}

export default AdminAlertas
