import { Link } from 'react-router-dom'
import './UserCollections.scss'

function UserCollections() {
  return (
    <>
      <h1>this is a collections page</h1>
      <button>
        <Link to='/collections/create-new-collection'>
          Create New Collection
        </Link>
      </button>
    </>
  )
}

export default UserCollections
