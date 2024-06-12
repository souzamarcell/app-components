import { format } from 'date-fns'
import Header from '../_components/header'
import { ptBR } from 'date-fns/locale'
import Search from './_components/search'
import BookingItem from '../_components/booking-item'
import { db } from '../_lib/prisma'
import BarbershopItem from './_components/barbershop-item'

export default async function Home() {
  // chamar prisma e pegar barbearias
  const barbershops = await db.barbershop.findMany({})

  const formattedDateWeek = format(new Date(), "EEEE','d' '", {
    locale: ptBR,
  })
  const formattedDateMonth = format(new Date(), "' 'MMMM' '", {
    locale: ptBR,
  })
  const formattedDateYear = format(new Date(), "' 'u", {
    locale: ptBR,
  })

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Marcell Souza</h2>
        <strong className="capitalize text-sm">{formattedDateWeek}</strong>
        <strong className="text-sm">de</strong>
        <strong className="capitalize text-sm">{formattedDateMonth}</strong>
        <strong className="text-sm">de</strong>
        <strong className="capitalize text-sm">{formattedDateYear}</strong>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>
      <div className="px-5 mt-6">
        <div className="text-xs uppercase text-gray-400 font-bold">
          Agendamento
        </div>
        <BookingItem />
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Recomendados  
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares  
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      </div>
    </div>
  )
}
