import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ApolloProvider } from '@apollo/client';

import { store } from '../store/store';
import { createShopQueryClient } from '../orders/queryClient';
import { createCatalogApolloClient } from '../catalog/apolloClient';
import { OrderBoard } from '../orders/OrderBoard';
import { CategoryRail } from '../catalog/CategoryRail';
import { useAppSelector } from '../store/hooks';
import { selectSelectedOrderId, selectSidebarOpen } from '../store/uiSlice';

const queryClient = createShopQueryClient();
const apolloClient = createCatalogApolloClient();

function Shell({ children }: { children: ReactNode }) {
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const selectedId = useAppSelector(selectSelectedOrderId);

  return (
    <div>
      <aside hidden={!sidebarOpen}>
        <CategoryRail />
      </aside>
      <main>
        {children}
        <p>ออเดอร์ที่เลือก: {selectedId ?? '—'}</p>
      </main>
    </div>
  );
}

/** รวม providers — ตัวอย่าง wiring ระดับ beginner */
export function ShopDeskApp() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apolloClient}>
          <Shell>
            <OrderBoard />
          </Shell>
        </ApolloProvider>
      </QueryClientProvider>
    </Provider>
  );
}
