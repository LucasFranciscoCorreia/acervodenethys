import type { ReferenciaID } from '@/enums/referencia'
import type { Tracos } from '@/enums/tracos'

export default interface Escudo {
  id: number
  escudo: string
  descricao: string
  preco: number
  bonusCA: number
  penVelocidade: number
  volume: number
  dureza: number
  PV: number
  tracos: Tracos[]
  referencia: ReferenciaID[]
}
