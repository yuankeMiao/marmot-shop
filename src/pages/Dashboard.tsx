import  useCheckMe  from '../appHooks/useCheckMe';


function Dashboard() {
const { currentUser, error, isLoading } = useCheckMe();

if(error || !currentUser) {
  return <div>Please Login</div>
}

if(currentUser && currentUser.id !== 1) {
  return <div>Please login the admin user</div>
}

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard