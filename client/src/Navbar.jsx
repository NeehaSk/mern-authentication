import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext)
  return (
    <nav>

      <Link to='/'>Home</Link>
      <div>
        {
          !user ? (
            <>
            <Link to='/login'>Login</Link>
     <Link to='/register'>Register</Link>
            </>

  ):(
    <div>
    <Link to='/dashboard'>Dashboard</Link>

    <button onClick={logoutUser}>Logout</button>
    </div>
  )

}
      </div>






    </nav>
  )
}
