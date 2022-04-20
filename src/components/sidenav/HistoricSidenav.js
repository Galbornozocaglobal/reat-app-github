import React, { useMemo } from 'react'
import { ButtonSidenav } from '../button/ButtonSidenav'

export const HistoricSidenav = ({ historic }) => {

  useMemo(() => { }, [historic])

  return (
    <div className="bg-gray-600 h-full  text-center">
      {
        historic.map((element, i) => (
          <ButtonSidenav key={i} element={element} />
        ))
      }

    </div>
  )
}
