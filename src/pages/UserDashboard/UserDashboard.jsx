import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'

import './UserDashboard.scss'

function UserDashboard() {
  const ResponsiveGridLayout = WidthProvider(Responsive)

  return (
    <>
      <ResponsiveGridLayout
        className='layout'
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        <div className='testbox' key='1'>
          1
        </div>
        <div className='testbox' key='2'>
          2
        </div>
        <div className='testbox' key='3'>
          3
        </div>
      </ResponsiveGridLayout>
    </>
  )
}

export default UserDashboard
