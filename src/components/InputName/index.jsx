import styles from './InputName.module.scss'
import React from "react";
import { useDispatch } from 'react-redux';
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { path } from "../../route/path";
import { logIn, setUserName } from '../../store/app/appSlice'
 
export const InputName = ()=> {
  const dispatch = useDispatch();
  const [name, setName] = React.useState("");
  const onChange = ({ target }) => setName(target.value);
  const navigate = useNavigate();
  const Start = ()=>{
    dispatch(logIn())
    dispatch(setUserName(name));
    setName('')
    navigate(path.homePage);
  }

  return (
    <div className="relative flex  max-w-[24rem] mb-[65px] mx-auto pt-[60px]">
      <Input
        type="name"
        label="Name"
        value={name}
        onChange={onChange}
        className={styles.inputText}
        containerProps={{
          className: "min-w-0",
        }}
      />
      <Button
        size="sm"
        color={name ? "blue" : "blue-gray"}
        disabled={!name}
        className="!absolute right-1 top-[64px] rounded"
        onClick={Start}
      >
        Start
      </Button>
    </div>
  );
}