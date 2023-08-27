import React, {useState} from 'react';

const MyContextAPI = React.createContext(null)

const MyContext = (props) => {
  const [modal,setModal] = useState(false)
  return (
    <MyContextAPI value={modal}>
      {props.children}
    </MyContextAPI>
  );
};

export default MyContext;