import React from "react";
import { useState } from "react";

const Form = () => {
  const [val,setVal] = useState("");
  const handleChange = (e) => {
    setVal(e.target.value);
  };
  return (
    <>
     <div className = "container">
      <input type = "text" value = {val} onChange = {handleChange} />
     </div>
    </>
    


    // <>
    // <div className="formContainer">
    //     <div className="uiForm">
    //       <div className="formField">
    //         <label>名前</label>
    //         <input 
    //         type="text" 
    //         placeholder="お名前" 
    //         name="yourName" 
    //         value={text} 
    //         onChange={(event)=>setText(event.target.value)} />
    //       </div>
    //       <div className="formField">
    //         <label>ユーザー名
    //          <input type="text" placeholder="ユーザーネーム(任意)" name="userName" />
    //         </label>
    //       </div>
    //       <div className="formField">
    //         <label>メールアドレス</label>
    //         <input type="text" placeholder="sample@example.com" name="mailAddress" />
    //       </div>
    //       <div className="formField">
    //         <label>パスワード</label>
    //         <input type="text" placeholder="パスワード" name="password" />
    //       </div>
    //       <div className="formField">
    //         <label>パスワード確認</label>
    //         <input type="text" placeholder="パスワード確認" name="passwordConf" />
    //       </div>
    //       <div className="formField">
    //         <label>郵便番号</label>
    //         <input type="text" placeholder="0123456" name="zipCode" />
    //         <button className="zipSearchBtn">検索</button>
    //       </div>
    //       <div className="formField">
    //         <label>都道府県</label>
    //         <input type="text" placeholder="都道府県" name="prefectures" />
    //       </div>
    //       <div className="formField">
    //         <label>市区町村</label>
    //         <input type="text" placeholder="市区町村" name="city" />
    //       </div>
    //       <div className="formField">
    //         <label>番地</label>
    //         <input type="text" placeholder="番地" name="blockNumber" />
    //       </div>
    //     </div>
    // </div>
    // </>
  );
}

export default Form;