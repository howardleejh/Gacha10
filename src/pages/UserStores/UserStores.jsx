import { Link } from 'react-router-dom'
import './UserStores.scss'

function UserStores() {
  return (
    <>
      <h1>this is a user stores page</h1>
      <button>
        <Link to='/stores/create-new-store'>Create New Store</Link>
      </button>
    </>
  )
}

export default UserStores
