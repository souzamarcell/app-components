import { format } from 'date-fns'
import Header from '../_components/header'
import { ptBR } from 'date-fns/locale'
import Search from './_components/search'
import BookingItem from '../_components/booking-item'
import { db } from '../_lib/prisma'
import BarbershopItem from './_components/barbershop-item'
import { getServerSession } from 'next-auth'
import { authOptions } from '../_lib/auth'
import Link from 'next/link'
import Image from 'next/image'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, recommendedBarbershops, confirmedBookings] =
    await Promise.all([
      db.barbershop.findMany({}),
      db.barbershop.findMany({
        orderBy: {
          id: 'asc',
        },
      }),
      session?.user
        ? db.booking.findMany({
            where: {
              userId: (session.user as any).id,
              date: {
                gte: new Date(),
              },
            },
            include: {
              service: true,
              barbershop: true,
            },
          })
        : Promise.resolve([]),
    ])

  return (
    <div>
      <Header />
      <div className="flex justify-between">
        <div className="px-5 pt-5">
          <h2 className="text-xl font-bold">
            {session?.user
              ? `Olá, ${session.user.name?.split(' ')[0]}!`
              : 'Olá! Vamos agendar um corte hoje?'}
          </h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>
        <div className="flex flex-col px-5 pt-5">
          <Link className="" href="https://www.linkedin.com/in/marcellsouza">
            {/* <Image src="/logo.png" alt="Marcell Souza / Linkedin" height={18} width={120} /> */}
            {/* Developer */}
            <img
              alt="Marcell Souza / Linkedin"
              src="https://img.shields.io/badge/-Linkedin.-835afd?style=flat&logo=Linkedin&logoColor=fff"
            />
          </Link>
          <Link className="pt-1" href="https://wa.me/5592991357070">
            <img
              alt="Marcell Souza / WhatsApp"
              src="https://img.shields.io/badge/-WhasApp-835afd?style=flat&logo=Whatsapp&logoColor=fff"
            />
          </Link>
        </div>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>
      <div className="mt-6">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold">
              Agendamentos
            </h2>
            <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Recomendados
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {recommendedBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
