import type { DadoDano } from '@/enums/dadoDano'
import type { GrupoArma } from '@/enums/grupoArma'
import type { MaosArma } from '@/enums/maosArma'
import type { ReferenciaID } from '@/enums/referencia'
import type { TipoDano } from '@/enums/tipoDano'
import type { Tracos } from '@/enums/tracos'

export default interface Arma {
  id: number
  arma: string
  descricao: string
  preco: number
  dadoDano: DadoDano
  tipoDano: TipoDano
  volume: number
  maos: MaosArma
  grupo: GrupoArma
  tracos: Tracos[]
  referencia: ReferenciaID[]
}
