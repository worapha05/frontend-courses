import { createOrderAction } from '@/lib/actions';

export function CreateOrderForm() {

  return (
    <form
      action={createOrderAction}
      className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h2 className="font-bold">สร้างออเดอร์</h2>
      <div>
        <label className="text-sm font-medium" htmlFor="customer">
          ลูกค้า
        </label>
        <input
          id="customer"
          name="customer"
          required
          minLength={2}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="total">
          ยอดรวม (บาท)
        </label>
        <input
          id="total"
          name="total"
          type="number"
          required
          min={1}
          step="0.01"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
      >
        สร้างด้วย Server Action
      </button>
    </form>
  );
}
