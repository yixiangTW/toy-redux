import { useRef, useState } from "react";
import { connect } from "../../ReactRedux";
import "./style.css";

const mockAsyncFn = (name: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(name);
    }, 3000);
  });
};

const mockPromise = (name: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: name,
      });
    }, 500);
  });
};

const ModifyUser = connect()(
  ({ state, dispatch }: { state: any; dispatch: any }) => {
    const myRef = useRef(null);
    const [onChangeDisable, setOnChangeDisable] = useState(false);

    const handleChange = (e: any) => {
      if (onChangeDisable) {
        return;
      }
      dispatch({
        type: "UpdateUser",
        payload: {
          name: e.target.value,
        },
      });
    };

    const handleAsyncFnClick = () => {
      dispatch(modifyUserName);
    };

    const handlePromiseClick = () => {
      //@ts-ignore
      const value = myRef.current.value;
      dispatch({
        type: "UpdateUser",
        payload: mockPromise(value),
      });
    };

    const modifyUserName = (dispatch: any) => {
      //@ts-ignore
      const value = myRef.current.value;
      mockAsyncFn(value).then((ret) => {
        dispatch({
          type: "UpdateUser",
          payload: {
            name: ret,
          },
        });
      });
    };

    return (
      <div className="modify-user">
        <div>组件 ModifyUser</div>
        <span>修改 user name</span>
        <input ref={myRef} onChange={handleChange} />
        <button
          onClick={() => {
            setOnChangeDisable((onChangeDisable) => !onChangeDisable);
          }}
        >
          {onChangeDisable ? "启用" : "禁用"}onChange
        </button><br/>
        <button onClick={handleAsyncFnClick}>修改 使用redux-thunk</button><br/>
        <button onClick={handlePromiseClick}>修改 使用redux-promise</button>
      </div>
    );
  }
);

export default ModifyUser;
