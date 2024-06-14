'use client'

import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import SideMenu from './side-menu'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarImage } from './ui/avatar'

const Header = () => {
  const { data } = useSession()
  return (
    <header>
      <Card>
        <CardContent className="p-5 justify-between items-center flex flex-row">
          <Link className="items-center flex flex-row gap-3" href="/">
            {data?.user && (
              <Avatar>
                <AvatarImage src={data.user?.image ?? ''} />
              </Avatar>
            )}
            <Image src="/logo.png" alt="MRS Barber" height={18} width={120} />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon size={16} />
              </Button>
            </SheetTrigger>

            <SheetContent className="p-0">
              <SideMenu />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
