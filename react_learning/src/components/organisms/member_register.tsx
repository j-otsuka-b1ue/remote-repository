import React from "react";
import { useState } from "react";
import { Button, TextInput, Textarea, ErrorMsg } from "../atoms/index"

export const RegisterForm = () => {
  const styles = {
    textColor: "white",
    backgroundColor: "blue"
  }
  const [formData, setFormData] = useState({
    realName: '',
    userName: '',
    mailAddress: '',
    password: '',
    passwordConfirm: '',
    zipcode: '',
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
    prefectures: '',
    city: '',
    houseNumber: ''
  })

  //フォーム入力値の更新を行う関数
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let valid = true;
    const { name, value } = event.target;
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
      prefectures: '',
      city: '',
      houseNumber: ''
    }
    //郵便番号検索ボタンのバリデーション
    const isSearchBtnValid = () => {
      return (
        formData.zipcode !== '' && newErrors.zipcode === ''
      )
    }

    if (name === 'realName' && value === '') {
      valid = false;
      newErrors.realName = '入力してください';
    }

    if (name === 'mailAddress' && value === '') {
      valid = false;
      newErrors.mailAddress = '入力してください';
    } else if (name === 'mailAddress' && !validateEmail(value)) {
      valid = false;
      newErrors.mailAddress = '正しいメールアドレスを入力してください';
    }

    if (name === 'password' && value === '') {
      valid = false;
      newErrors.password = '入力してください';
    } else if (name === 'password' && value.length < 4) {
      valid = false;
      newErrors.password = '4文字以上で入力してください';
    }

    if (name === 'passwordConfirm' && value === '') {
      valid = false;
      newErrors.passwordConfirm = '入力してください';
    } else if (name === 'passwordConfirm' && value !== formData.password) {
      valid = false;
      newErrors.passwordConfirm = 'パスワードが一致しません';
    }

    if (name === 'zipcode' && value === '') {
      valid = false;
      newErrors.zipcode = '入力してください';
    } else if (name === 'zipcode' && !validateZipcode(value)) {
      valid = false;
      newErrors.zipcode = 'ハイフンなしの半角数字7桁を入力してください';
    }

    if (name === 'prefectures' && value === '') {
      valid = false;
      newErrors.prefectures = '入力してください';
    }

    if (name === 'city' && value === '') {
      valid = false;
      newErrors.city = '入力してください';
    }

    if (name === 'houseNumber' && value === '') {
      valid = false;
      newErrors.houseNumber = '入力してください';
    }
    setFormErrors(newErrors);
  };

  //メールアドレス形式バリデーション
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return emailRegex.test(email);
  };

  //郵便番号形式バリデーション
  const validateZipcode = (zipcode: string) => {
    const zipcodeWithOutHyphenRegex = /^[0-9]{7}$/;
    return zipcodeWithOutHyphenRegex.test(zipcode);
  }

  const isZipcodeFormValid = (errors: typeof formErrors) => {
    return (
      formData.zipcode !== '' &&
      errors.zipcode === ''
    )
  }

  //郵便番号検索API
  const handleSearch = async () => {
    try {
      const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${formData.zipcode}`);
      const data = await response.json();

      if (data.status === 200 && data.results) {
        const addressData = data.results[0];
        setFormData(prevState => ({
          ...prevState,
          prefectures: addressData.address1,
          city: `${addressData.address2}${addressData.address3}`
        }));
        setFormErrors(prevErrors => ({
          ...prevErrors,
          zipcode: '',
        }));
      } else if (formData.zipcode === '') {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          zipcode: '郵便番号を入力してください',
        }));
      } else {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          zipcode: '存在しない郵便番号です',
        }));
      }
    } catch (error) {
      console.error('郵便番号の検索に失敗しました');
    }
  }
  //郵便番号入力フォームのバリデーション
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
    if (isFormValid()) {
      console.log('登録が完了しました');
      setFormData({
        realName: '',
        userName: '',
        mailAddress: '',
        password: '',
        passwordConfirm: '',
        zipcode: '',
        prefectures: '',
        city: '',
        houseNumber: ''
      });
    };
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="formContainer">
          <div className="uiForm">
            <div className="form-field">
              <label className="form-label">名前</label>
              <input
                type="text"
                className="form-field-input"
                placeholder="名前"
                name="realName"
                value={formData.realName}
                onChange={(value) => handleChange(value)}
              />
              <ErrorMsg>{formErrors.realName}</ErrorMsg>
            </div>
            <div className="form-field">
              <label className="form-label">ユーザー名(任意)</label>
              <input
                type="text"
                className="form-field-input"
                placeholder="ユーザー名(任意)"
                name="userName"
                value={formData.userName}
                onChange={(event) => handleChange(event)}
              />
            </div>
            <div className="form-field">
              <label className="form-label">メールアドレス</label>
              <input
                type="text"
                className="form-field-input"
                placeholder="メールアドレス"
                name="mailAddress"
                value={formData.mailAddress}
                onChange={(event) => handleChange(event)}
              />
              <ErrorMsg>{formErrors.mailAddress}</ErrorMsg>
            </div>
            <div className="form-field">
              <label className = "form-label">パスワード</label>
              <input
                type="text"
                className="form-field-input"
                placeholder="パスワード"
                name="password"
                value={formData.password}
                onChange={(event) => handleChange(event)}
              />
               <ErrorMsg>{formErrors.password}</ErrorMsg>
            </div>
            <div className="form-field">
              <label className="form-label">パスワード(確認)</label>
              <input
                type="text"
                className="form-field-input"
                placeholder="パスワード(確認)"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={(event) => handleChange(event)}
              />
               <ErrorMsg>{formErrors.passwordConfirm}</ErrorMsg>
            </div>
            <div className="form-field">
              <label className="form-label">郵便番号</label>
              <div className = "zip-parts">
                <input
                  type="text"
                  className="form-field-input"
                  placeholder="0123456"
                  name="zipcode"
                  value={formData.zipcode}
                  // maxLength={7}
                  onChange={(event) => handleChange(event)}
                />
               <div>
                 <Button 
                   name = "検索" 
                   onClick = {handleSearch} 
                   isDisabled = {!isZipcodeFormValid(formErrors)}
                 />
               </div>
              </div>
              <ErrorMsg>{formErrors.zipcode}</ErrorMsg>
            </div>
            <div className="form-field">
              <label className="form-label">都道府県</label>
              <input
                type="text"
                className="form-field-input"
                placeholder="都道府県"
                name="prefectures"
                value={formData.prefectures}
                onChange={(event) => handleChange(event)}
              />
               <ErrorMsg>{formErrors.prefectures}</ErrorMsg>
            </div>
            <div className="form-field">
              <label className="form-label">市区町村</label>
              <input
                type="text"
                className="form-field-input"
                placeholder="市区町村"
                name="city"
                value={formData.city}
                onChange={(event) => handleChange(event)}
              />
               <ErrorMsg>{formErrors.city}</ErrorMsg>
            </div>
            <div className="form-field">
              <label className="form-label">番地</label>
              <input
                type="text"
                className="form-field-input"
                placeholder="番地"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={(event) => handleChange(event)}
              />
              <ErrorMsg>{formErrors.houseNumber}</ErrorMsg>
              <div className="btn-field">
               <Button 
                name = "登録" 
                isDisabled = {!isFormValid()}
               />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
