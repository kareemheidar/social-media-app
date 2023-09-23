import { useRouter } from 'next/router'
import NewPass from '../../components/NewPass'

const ResetPassword = () => {
  const router = useRouter()
  const { token } = router.query

  return <NewPass token={token}></NewPass>;
}

export default ResetPassword;