import type Biografia from '@/interfaces/Biografia'
import type RouterLinkProp from '@/interfaces/RouterLinkProp'
import type Classe from '@/interfaces/Classe'
import type Arquetipo from '@/interfaces/Arquetipo'
import type Pericia from '@/interfaces/Pericia'
import type Heranca from '@/interfaces/Heranca'
import type TracosDescricao from '@/interfaces/TracosDescricao'

import { computed } from 'vue'

import links from '@/data/links.json'
import biografias from '@/data/biografias.json'
import classes from '@/data/classes.json'
import arquetipos from '@/data/arquetipos.json'
import pericias from '@/data/pericias.json'
import herancas from '@/data/herancas.json'
import tracosDescricao from '@/data/tracos.json'
import armas from '@/data/armas.json'
import armaduras from '@/data/armaduras.json'
import escudos from '@/data/escudos.json'
import equipamentos from '@/data/equipamentosAventura.json'
import atividades from '@/data/acoesAtividades.json'
import magias from '@/data/magias.json'
import type Magia from '@/interfaces/Magia'
import type Arma from '@/interfaces/Arma'
import type Armadura from '@/interfaces/Armadura'
import type Escudo from '@/interfaces/Escudo'
import type EquipamentoAventura from '@/interfaces/EquipamentoAventura'
import type AcaoAtividade from '@/interfaces/AcaoAtividade'
import { TradicaoMagia } from '@/enums/tradicaoMagia'

export const findRoute = (path: string): RouterLinkProp | undefined => {
  if (path === '/') return undefined
  let activeRoute: RouterLinkProp | undefined = links.find(
    (link: RouterLinkProp) => link.href === path,
  )
  if (activeRoute) return activeRoute
  activeRoute = links.find((link: RouterLinkProp) =>
    link.sublinks?.find((sublink: RouterLinkProp) => sublink.href === path),
  )
  if (!activeRoute) return undefined
  if (!activeRoute.sublinks || activeRoute.sublinks.length == 0) return activeRoute
  return activeRoute.sublinks.find((link) => link.href === path)
}

export const findBiografia = (href?: string): Biografia | undefined => {
  if (href == undefined) return undefined
  return biografias.find((a) => a.href === href) as unknown as Biografia
}

export const findClasse = (href?: string): Classe | undefined => {
  if (href == undefined) return undefined
  return classes.find((a) => a.href === href) as Classe | undefined
}

export const findArquetipo = (href?: string): Arquetipo | undefined => {
  if (href == undefined) return undefined
  return arquetipos.find((a) => a.href === href) as Arquetipo | undefined
}

export const findPericia = (href?: string): Pericia | undefined => {
  if (href == undefined) return undefined
  return pericias.find((a) => a.href === href) as Pericia | undefined
}

export const findHerancas = (id: number): Heranca | undefined => {
  return herancas.find((a) => a.id === id) as Heranca | undefined
}

export const findTracoDescricao = (id?: number): TracosDescricao | undefined => {
  if (id === undefined) return undefined
  return tracosDescricao.find((a) => a.id == id) as TracosDescricao | undefined
}

export const findArma = (id?: number): Arma | undefined => {
  if (id === undefined) return undefined
  return armas.find((a) => a.id === id) as unknown as Arma | undefined
}

export const findArmadura = (id?: number): Armadura | undefined => {
  if (id === undefined) return undefined
  return armaduras.find((a) => a.id === id) as unknown as Armadura | undefined
}

export const findEscudo = (id?: number): Escudo | undefined => {
  if (id === undefined) return undefined
  return escudos.find((a) => a.id === id) as unknown as Escudo | undefined
}

export const findEquipamentoAventura = (id?: number): EquipamentoAventura | undefined => {
  if (id === undefined) return undefined
  return equipamentos.find((a) => a.id === id) as unknown as EquipamentoAventura | undefined
}

export const findAtividade = (id?: number): AcaoAtividade | undefined => {
  if (id === undefined) return undefined
  return atividades.find((a) => a.id === id) as unknown as AcaoAtividade | undefined
}

export const findMagia = (id?: number): Magia | undefined => {
  if (id === undefined) return undefined
  return magias.find((a) => a.id === id) as unknown as Magia | undefined
}

export const collectBiografiasByName = computed((): Biografia[] => {
  return biografias.sort((a, b) => a.biografia.localeCompare(b.biografia))
})

export const collectClassesByName = computed((): Classe[] => {
  return classes.sort((a, b) => a.classe.localeCompare(b.classe))
})

export const collectArquetiposByName = computed((): Arquetipo[] => {
  return arquetipos.sort((a, b) => a.arquetipo.localeCompare(b.arquetipo))
})

export const collectPericiasByName = computed((): Pericia[] => {
  return pericias.sort((a, b) => a.pericia.localeCompare(b.pericia))
})

export const collectMagiasByName = computed((): Magia[] => {
  return magias.sort((a, b) => a.magia.localeCompare(b.magia)) as unknown as Magia[]
})

export const collectMagiasArcanas = computed((): Magia[] => {
  return magias.filter((el: Magia) => el.tradicao.includes(TradicaoMagia.ARCANA)) as Magia[]
})

export const collectMagiasDivinas = computed((): Magia[] => {
  return magias.filter((el: Magia) => el.tradicao.includes(TradicaoMagia.DIVINA)) as Magia[]
})

export const collectMagiasPrimais = computed((): Magia[] => {
  return magias.filter((el: Magia) => el.tradicao.includes(TradicaoMagia.PRIMAL)) as Magia[]
})

export const collectMagiasOcultistas = computed((): Magia[] => {
  return magias.filter((el: Magia) => el.tradicao.includes(TradicaoMagia.OCULTISTA)) as Magia[]
})

export const collectMagiasFoco = computed((): Magia[] => {
  return magias
  //return magias.filter((el: Magia) => el.tracos.includes(Tracos.FOCALIZAR)) as Magia[];
})

export const collectMagiasRitual = computed((): Magia[] => {
  return magias
  // return magias.filter((el: Magia) => el.tracos.includes(Tracos.RITUAL)) as Magia[];
})
