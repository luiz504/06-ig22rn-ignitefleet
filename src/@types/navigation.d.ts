import { AppRoutesList } from '~/routes/app.routes'

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRoutesList {}
  }
}
