import type { GrupoArmadura } from '@/enums/grupoArmadura'
import type { ReferenciaID } from '@/enums/referencia'
import type { Tracos } from '@/enums/tracos'

export default interface Armadura {
  id: number
  armadura: string
  descricao: string
  preco: number
  bonusCA: number
  limiteDes: number
  penTeste: number
  penVelocidade: number
  volume: number
  grupo: GrupoArmadura
  tracos: Tracos[]
  referencia: ReferenciaID[]
}
