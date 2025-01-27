import type { Tracos } from '@/enums/tracos'

export default interface Ancestralidade {
  ancestralidade: string
  titulo: string
  descricao: string
  href: string
  explicacao: string
  idTracos: Tracos[]
}
