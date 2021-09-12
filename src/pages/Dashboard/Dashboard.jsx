import { Responsive, WidthProvider } from 'react-grid-layout'
import './Dashboard.scss'

function Dashboard() {
  const ResponsiveGridLayout = WidthProvider(Responsive)

  const layouts = ''

  return (
    <>
      <h1>this is a dashboard page</h1>
      <ResponsiveGridLayout
        className='layout'
        layouts={layouts}
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

export default Dashboard
