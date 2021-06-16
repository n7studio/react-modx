export type ReducerCallable = {
  type: string;
  call: (state: any, payload: any) => {};
};
