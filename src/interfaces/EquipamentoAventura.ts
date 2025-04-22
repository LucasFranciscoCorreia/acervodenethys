import type { ReferenciaID } from '@/enums/referencia'

export default interface EquipamentoAventura {
  id: number
  nome: string
  descricao: string
  preco: number
  volume: number
  maos: number
  nivel: number
  equipado: boolean
  referencia: ReferenciaID[]
}
