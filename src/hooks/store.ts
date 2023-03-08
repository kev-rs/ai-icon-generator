/* eslint-disable */

import { api } from '@/utils/api';
import { checkout } from '@/utils/pay';
import { create } from 'zustand';

interface Store {
  credits: number;
  pay: () => void;
};

const useStoreCreated = () => {
  const user = api.auth.getUser.useQuery();
  const res = api.payment.createCheckout.useMutation();
  const credits = user.data?.credits ?? 1;

  return create<Store>()(
    ((set) => ({
      credits,
      pay: () => {
        res.mutate(undefined, {
          onSuccess: data => checkout(data.id),
          onError: console.log
        })
      }
    }))
  )
}

type Result = ReturnType<typeof useStoreCreated>;

const useZustandStore = (store: typeof useStoreCreated): Result => store();

const useStore = () => useZustandStore(useStoreCreated)

// const useStore = (store: typeof useStoreCreated) => store();
// const store = useStore(useStoreCreated);
export { useStore };