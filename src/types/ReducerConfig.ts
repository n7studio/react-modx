export declare type ReducerConfig = {
  actionType: string;
  reducerName?: string;
  reducer: (currentState: any, payload: any) => {};
};