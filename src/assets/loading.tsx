import Image from 'next/image'
import Spinner from '../../public/Spinner.svg'

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Image src={Spinner} alt="loading" width={50} height={50} />
    </div>
  )
}

export default Loader
