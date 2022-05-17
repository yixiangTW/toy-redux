export type MapStateToProps = (x: InitState) => any
export type Dispatch = (x: Action) => void;
export type MapDispatchToProps = (dispatch: Dispatch) => any


export type Connect = (mapStateToProps?: MapStateToProps, mapDispatchToProps?: MapDispatchToProps) => any
export type Action = {
  type: string;
  payload?: any
}
export type Store = {
  getState: () => any;
  dispatch: Dispatch;
  subscribe: (fn: any) => () => void
}
export type Reducer<T> = (x: T, y: Action) => T
export type CreateStore<T> = (x: Reducer<T>, y: T, z?: any) => Store
export type InitState = {
  user: {
    name: string;
    age: number;
  };
  group: {
    name: string;
  }
}
