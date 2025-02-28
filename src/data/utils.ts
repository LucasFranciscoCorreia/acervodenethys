import type Ancestralidade from '@/interfaces/Ancestralidade'
import type Biografia from '@/interfaces/Biografia'
import type RouterLinkProp from '@/interfaces/RouterLinkProp'
import type Classe from '@/interfaces/Classe'
import type Arquetipo from '@/interfaces/Arquetipo'
import type Pericia from '@/interfaces/Pericia'
import type Heranca from '@/interfaces/Heranca'
import type Talento from '@/interfaces/Talento'
import type { Tracos } from '@/enums/tracos'
import type TracosDescricao from '@/interfaces/TracosDescricao'

import { computed } from 'vue'

import links from '@/data/links.json'
import ancestralidades from '@/data/ancestralidades.json'
import biografias from '@/data/biografias.json'
import classes from '@/data/classes.json'
import arquetipos from '@/data/arquetipos.json'
import pericias from '@/data/pericias.json'
import herancas from '@/data/herancas.json'
import talentos from '@/data/talentos.json'
import tracosDescricao from '@/data/tracos.json'

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

export const findAncestralidade = (ancestralidade: string): Ancestralidade | undefined => {
  return ancestralidades.find(
    (a) => a.ancestralidade === ancestralidade,
  ) as unknown as Ancestralidade
}

export const findBiografia = (biografia: string): Biografia | undefined => {
  return biografias.find((a) => a.biografia === biografia) as unknown as Biografia
}

export const findClasse = (classe: string): Classe | undefined => {
  return classes.find((a) => a.classe === classe) as Classe | undefined
}

export const findArquetipo = (arquetipo: string): Arquetipo | undefined => {
  return arquetipos.find((a) => a.arquetipo === arquetipo) as Arquetipo | undefined
}

export const findPericia = (arquetipo: string): Pericia | undefined => {
  return pericias.find((a) => a.pericia === arquetipo) as Pericia | undefined
}

export const findHerancas = (ancestralidade: string): Heranca | undefined => {
  return herancas.find((a) => a.ancestralidade === ancestralidade) as Heranca | undefined
}

export const findTalento = (id?: number): Talento | undefined => {
  if (id === undefined) return undefined
  return talentos.find((a) => a.id == id) as Talento | undefined
}

export const findTracoDescricao = (id?: number): TracosDescricao | undefined => {
  if (id === undefined) return undefined
  return tracosDescricao.find((a) => a.id == id) as TracosDescricao | undefined
}

export const collectAncestralidadesByName = computed((): Ancestralidade[] => {
  return ancestralidades.sort((a, b) =>
    a.titulo.localeCompare(b.titulo),
  ) as unknown as Ancestralidade[]
})

export const collectBiografiasByName = computed((): Biografia[] => {
  return biografias.sort((a, b) => a.titulo.localeCompare(b.titulo))
})

export const collectClassesByName = computed((): Classe[] => {
  return classes.sort((a, b) => a.titulo.localeCompare(b.titulo))
})

export const collectArquetiposByName = computed((): Arquetipo[] => {
  return arquetipos.sort((a, b) => a.titulo.localeCompare(b.titulo))
})

export const collectPericiasByName = computed((): Pericia[] => {
  return pericias.sort((a, b) => a.titulo.localeCompare(b.titulo))
})

export const collectTalentosByName = computed((): Talento[] => {
  return talentos.sort((a, b) => a.nivel - b.nivel || a.titulo.localeCompare(b.titulo)) as Talento[]
})

export const collectTalentosByAnyTracos = (tracos?: Tracos[]): Talento[] => {
  if (!tracos || tracos.length === 0) return []
  return talentos
    .filter((el) => tracos.some((traco) => el.tracos.includes(traco)))
    .sort((a, b) => a.nivel - b.nivel || a.titulo.localeCompare(b.titulo)) as Talento[]
}
