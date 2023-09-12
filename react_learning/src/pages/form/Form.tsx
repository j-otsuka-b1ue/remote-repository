import React from "react";
import { useState } from "react";

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    realName: '',
    userName: '',
    mailAddress: '',
    password: '',
    passwordConfirm: '',
    zipcode: '',
    searchBtn: '',
    prefectures: '',
    city: '',
    houseNumber: ''
  })

  const [formErrors, setFormErrors] = useState({
    realName: '',
    userName: '',
    mailAddress: '',
    password: '',
    passwordConfirm: '',
    zipcode: '',
    searchBtn: '',
    prefectures: '',
    city: '',
    houseNumber: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valid = true;
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const newErrors = {
      realName: '',
      userName: '',
      mailAddress: '',
      password: '',
      passwordConfirm: '',
      zipcode: '',
      searchBtn: '',
      prefectures: '',
      city: '',
      houseNumber: ''
    }

    if (formData.realName === '') {
      valid = false;
      newErrors.realName = '入力してください';
    }

    if (formData.mailAddress === '') {
      valid = false;
      newErrors.mailAddress = '入力してください';
    } else if (!validateEmail(formData.mailAddress)){
      valid = false;
      newErrors.mailAddress = '正しいメールアドレスを入力してください';
    }

    if (formData.password === '') {
      valid = false;
      newErrors.password = '入力してください';
    } else if (formData.password.length < 4) {
      valid = false;
      newErrors.password = '4文字以上で入力してください';
    }

    if (formData.passwordConfirm === '') {
      valid = false;
      newErrors.passwordConfirm = '入力してください';
    } else if (formData.passwordConfirm !== formData.password) {
      valid = false;
      newErrors.passwordConfirm = 'パスワードが一致しません';
    }

    if (formData.zipcode === '') {
      valid = false;
      newErrors.zipcode = '入力してください';
    } else if (!validateZipcode(formData.zipcode)){
      newErrors.zipcode = 'ハイフンなしの半角数字7桁を入力してください';
    }

    if (formData.prefectures === '') {
      valid = false;
      newErrors.prefectures = '入力してください';
    }

    if (formData.city === '') {
      valid = false;
      newErrors.city = '入力してください';
    }

    if (formData.houseNumber === '') {
      valid = false;
      newErrors.houseNumber = '入力してください';
    }
    setFormErrors(newErrors);
  };

  //メールアドレス形式バリデーション
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //郵便番号形式バリデーション
  const validateZipcode = (zipcode: string) => {
    const zipcodeRegex = /^\d{7}$/;
    return zipcodeRegex.test(zipcode);
  }

  //郵便番号検索API
  const handleSearch = async () => {
    try {
      const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${formData.zipcode}`);
      const data = await response.json();

      if(data.status === 200 && data.results) {
        const addressData = data.results[0];
        setFormData(prevState => ({
          ...prevState,
          prefectures: addressData.address1,
          city: `${addressData.address2}${addressData.address3}`
        }));
        setFormErrors(prevErrors => ({
          ...prevErrors,
          searchBtn: '',
        }));
      } else if(formData.zipcode === '') {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          searchBtn: '郵便番号を入力してください',
        }));
      } else {
          setFormErrors(prevErrors => ({
            ...prevErrors,
            searchBtn: '存在しない郵便番号です',
          }));
        }
      } catch(error){
        console.error('郵便番号の検索に失敗しました');
    }
  }

  const isFormValid = () => {
    return (
      formData.realName !== '' &&
      formData.mailAddress !== '' &&
      formData.password !== '' &&
      formData.passwordConfirm !== '' &&
      formData.zipcode !== '' &&
      formData.prefectures !== '' &&
      formData.city !== '' &&
      formData.houseNumber !== '' 
    );
  };

  //登録ボタン押下時のイベント
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(isFormValid()){
      console.log('登録が完了しました');
      setFormData({
        realName: '',
        userName: '',
        mailAddress: '',
        password: '',
        passwordConfirm: '',
        zipcode: '',
        searchBtn: '',
        prefectures: '',
        city: '',
        houseNumber: ''
      });
    };
  }



  return (
    <>
    <form onSubmit = {handleSubmit}>
    <div className = "formContainer">
      <div className = "uiForm">
        <div className = "form-field">
          <label className ="form-label">名前</label>
          <input 
          type = "text" 
          className="form-field-input" 
          placeholder = "名前" 
          name = "realName" 
          value = {formData.realName}
          onChange = {(event) => handleChange(event)}
          />
          <div className = "text-red-600 font-bold">{formErrors.realName}</div>
        </div>
        <div className = "form-field">
          <label className ="form-label">ユーザー名(任意)</label>
          <input 
          type = "text" 
          className="form-field-input" 
          placeholder = "ユーザー名(任意)" 
          name = "userName" 
          value = {formData.userName}
          onChange = {(event) => handleChange(event)}
          />
        </div>
        <div className = "form-field">
          <label className ="form-label">メールアドレス</label>
          <input 
          type = "text" 
          className="form-field-input" 
          placeholder = "メールアドレス" 
          name = "mailAddress" 
          value = {formData.mailAddress}
          onChange = {(event) => handleChange(event)}
          />
          <div className = "text-red-600 font-bold">{formErrors.mailAddress}</div>
        </div>
        <div className = "form-field">
          <label className ="form-label">パスワード</label>
          <input 
          type = "text" 
          className="form-field-input" 
          placeholder = "パスワード" 
          name = "password" 
          value = {formData.password}
          onChange = {(event) => handleChange(event)}
          />
          <div className = "text-red-600 font-bold">{formErrors.password}</div>
        </div>
        <div className = "form-field">
          <label className ="form-label">パスワード(確認)</label>
          <input 
          type = "text" 
          className="form-field-input" 
          placeholder = "パスワード(確認)" 
          name = "passwordConfirm" 
          value = {formData.passwordConfirm}
          onChange = {(event) => handleChange(event)}
          />
          <div className = "text-red-600 font-bold">{formErrors.passwordConfirm}</div>
        </div>
        <div className = "form-field">
          <label className ="form-label">郵便番号</label>
          <input 
          type = "text" 
          className="form-field-input" 
          placeholder = "0123456" 
          name = "zipcode" 
          value = {formData.zipcode}
          onChange = {(event) => handleChange(event)}
          />
          <div className = "text-red-600 font-bold">{formErrors.zipcode}</div>
          <div>
            <button className="btn" onClick = {handleSearch} name="searchBtn" type="button">検索</button>
            <div className = "text-red-600 font-bold">{formErrors.searchBtn}</div>
          </div>
        </div>
        <div className = "form-field">
          <label className ="form-label">都道府県</label>
          <input 
          type = "text" 
          className="form-field-input" 
          placeholder = "都道府県" 
          name = "prefectures" 
          value = {formData.prefectures}
          onChange = {(event) => handleChange(event)}
          />
          <div className = "text-red-600 font-bold">{formErrors.prefectures}</div>
        </div>
        <div className = "form-field">
          <label className ="form-label">市区町村</label>
          <input 
          type = "text" 
          className="form-field-input" 
          placeholder = "市区町村" 
          name = "city"
          value = {formData.city}
          onChange = {(event) => handleChange(event)}
          />
          <div className = "text-red-600 font-bold">{formErrors.city}</div>
        </div>
        <div className = "form-field">
          <label className ="form-label">番地</label>
          <input 
          type = "text" 
          className="form-field-input" 
          placeholder = "番地" 
          name = "houseNumber" 
          value = {formData.houseNumber}
          onChange = {(event) => handleChange(event)}
          />
          <div className = "text-red-600 font-bold">{formErrors.houseNumber}</div>
        </div>
        <div className = "form-field">
          <button className="btn" type = "submit" disabled={!isFormValid()}>登録</button>
        </div>
      </div>
    </div>
    </form>
    </>
  );
}

export default Form;