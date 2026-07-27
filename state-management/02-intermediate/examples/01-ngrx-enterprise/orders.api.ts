import { delay, of, throwError, type Observable } from 'rxjs';
import type { Order } from './orders.actions';

const MOCK: Order[] = [
  { id: 'ORD-1', customer: 'Ann', total: 500, status: 'paid' },
  { id: 'ORD-2', customer: 'Bee', total: 200, status: 'pending' },
  { id: 'ORD-3', customer: 'Cat', total: 900, status: 'paid' },
];

/** API service แบบ plain TypeScript — ใน Angular จะหุ้มด้วย @Injectable */
export class OrdersApi {
  getOrders(status: 'all' | 'paid' | 'pending'): Observable<Order[]> {
    if (status === 'pending' && Math.random() < 0.1) {
      return throwError(() => new Error('Orders API down'));
    }
    const data = status === 'all' ? MOCK : MOCK.filter((o) => o.status === status);
    return of(data).pipe(delay(250));
  }
}
