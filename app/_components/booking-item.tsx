import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

const BookingItem = () => {
  return (
    <Card>
      <CardContent className="p-5 flex justify-between py-0 bg-red-500">
        {/* <CardContent className="p-5 flex justify-between py-0"> */}
        <div className="flex flex-col gap-2 py-5 bg-blue-500">
          {/* <div className="flex flex-col gap-2 py-5"> */}
          <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">
            Confirmado
          </Badge>
          <h2 className="font-bold">Corte de Cabelo</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://avatars.githubusercontent.com/u/28017754?s=48&v=4" />

              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className="bg-blue-500 flex flex-col items-center justify-center px-3 border-l border-solid border-secondary">
          {/* <div className="flex flex-col items-center justify-center border-l border-solid border-secondary"> */}
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">09:44</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem
