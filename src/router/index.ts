import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import AncestralidadesView from '@/views/AncestralidadesView.vue'
import BiografiaView from '@/views/BiografiaView.vue'
import ClasseView from '@/views/ClasseView.vue'
import ArquetipoView from '@/views/ArquetipoView.vue'
import PericiasView from '@/views/PericiasView.vue'
import TalentosView from '@/views/TalentosView.vue'
import ArmasView from '@/views/ArmasView.vue'
import ArmadurasView from '@/views/ArmadurasView.vue'
import EscudosView from '@/views/EscudosView.vue'
import EquipamentosAventuraView from '@/views/EquipamentosAventuraView.vue'
import TracosView from '@/views/TracosView.vue'
import ReferenciasView from '@/views/ReferenciasView.vue'
import CondicaoView from '@/views/CondicaoView.vue'
import AcoesAtividadesView from '@/views/AcoesAtividadesView.vue'
import MagiasView from '@/views/MagiasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/ancestralidades',
      name: 'ancestralidade',
      component: AncestralidadesView,
    },
    {
      path: '/biografias',
      name: 'biografias',
      component: BiografiaView,
    },
    {
      path: '/classes',
      name: 'classes',
      component: ClasseView,
    },
    {
      path: '/arquetipos',
      name: 'arquetipos',
      component: ArquetipoView,
    },
    {
      path: '/pericias',
      name: 'pericias',
      component: PericiasView,
    },
    {
      path: '/talentos',
      name: 'talentos',
      component: TalentosView,
    },
    {
      path: '/armas',
      name: 'armas',
      component: ArmasView,
    },
    {
      path: '/armaduras',
      name: 'armaduras',
      component: ArmadurasView,
    },
    {
      path: '/escudos',
      name: 'escudos',
      component: EscudosView,
    },
    {
      path: '/equipamentos',
      name: 'equipamentosAventura',
      component: EquipamentosAventuraView,
    },
    {
      path: '/tracos',
      name: 'traços',
      component: TracosView,
    },
    {
      path: '/referencias',
      name: 'referencias',
      component: ReferenciasView,
    },
    {
      path: '/condicoes',
      name: 'condicoes',
      component: CondicaoView,
    },
    {
      path: '/acoesatividades',
      name: 'acoesatividades',
      component: AcoesAtividadesView,
    },
    {
      path: '/magias',
      name: 'magias',
      component: MagiasView,
    },
    /*
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    */
  ],
})

export default router
