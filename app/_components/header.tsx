'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/app/_components/ui/card'
import { Button } from '@/app/_components/ui/button'
// import { signIn, signOut, useSession } from 'next-auth/react'
import { MenuIcon } from 'lucide-react'

const Header = () => {
  // const { data } = useSession()
  // const handleLoginClick = async () => {
  //   await signIn()
  // }
  return (
    <Card>
      <CardContent className="p-5 justify-between items-center flex flex-row">
        <Image src="/logo.png" alt="MRS Barber" height={18} width={120} />
        <Button variant="outline" size="icon" className="h-8 w-6">
          <MenuIcon size={18} />
        </Button>

        {/* {data?.user ? (
          <>
            <h1>{data.user.name}</h1>
            <Button onClick={() => signOut()}>Logout</Button>
          </>
        ) : (
          <Button onClick={handleLoginClick}>Login</Button>
        )} */}
      </CardContent>
    </Card>
  )
}

export default Header
