import React from "react";
import { useState } from "react";
import { CommonButton } from "../atoms/index"
import { LabelAndTextInput } from "../molecules";

export const MemberRegist = () => {
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
  const handleInputChange = (name: string) => (value: string) => {
    handleChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // let valid = true;
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
    if (name === 'realName' && value === '') {
      newErrors.realName = '入力してください';
    }

    if (name === 'mailAddress' && value === '') {
      newErrors.mailAddress = '入力してください';
    } else if (name === 'mailAddress' && !validateEmail(value)) {
      newErrors.mailAddress = '正しいメールアドレスを入力してください';
    }

    if (name === 'password' && value === '') {
      newErrors.password = '入力してください';
    } else if (name === 'password' && value.length < 4) {
      newErrors.password = '4文字以上で入力してください';
    }

    if (name === 'passwordConfirm' && value === '') {
      newErrors.passwordConfirm = '入力してください';
    } else if (name === 'passwordConfirm' && value !== formData.password) {
      newErrors.passwordConfirm = 'パスワードが一致しません';
    }

    if (name === 'zipcode' && value === '') {
      newErrors.zipcode = '入力してください';
    } else if (name === 'zipcode' && !validateZipcode(value)) {
      newErrors.zipcode = 'ハイフンなしの半角数字7桁を入力してください';
    }

    if (name === 'prefectures' && value === '') {
      newErrors.prefectures = '入力してください';
    }

    if (name === 'city' && value === '') {
      newErrors.city = '入力してください';
    }

    if (name === 'houseNumber' && value === '') {
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
              <LabelAndTextInput
                labelTitle="名前"
                errorMessage={formErrors.realName}
                placeholder="名前"
                value={formData.realName}
                name="realName"
                onChange={handleInputChange('realName')}
              />
            </div>
            <div className="form-field">
              <LabelAndTextInput
                labelTitle="ユーザー名(任意)"
                errorMessage={formErrors.userName}
                placeholder="ユーザー名(任意)"
                value={formData.userName}
                name="userName"
                onChange={handleInputChange('userName')}
              />
            </div>
            <div className="form-field">
              <LabelAndTextInput
                labelTitle="メールアドレス"
                errorMessage={formErrors.mailAddress}
                placeholder="sample@example.com"
                value={formData.mailAddress}
                name="userName"
                onChange={handleInputChange('mailAddress')}
              />
            </div>
            <div className="form-field">
              <LabelAndTextInput
                labelTitle="パスワード"
                errorMessage={formErrors.password}
                placeholder="パスワード"
                value={formData.password}
                name="password"
                onChange={handleInputChange('password')}
              />
            </div>
            <div className="form-field">
              <LabelAndTextInput
                labelTitle="パスワード(確認)"
                errorMessage={formErrors.passwordConfirm}
                placeholder="パスワード(確認)"
                value={formData.passwordConfirm}
                name="password"
                onChange={handleInputChange('passwordConfirm')}
              />
            </div>
            <div className="form-field">
              <div className="zip-parts">
                <LabelAndTextInput
                  labelTitle="郵便番号"
                  errorMessage={formErrors.zipcode}
                  placeholder="0123456"
                  value={formData.zipcode}
                  name="zipcode"
                  onChange={handleInputChange('zipcode')}
                />
                <div>
                  <CommonButton
                    name="検索"
                    onClick={handleSearch}
                    isDisabled={!isZipcodeFormValid(formErrors)}
                  />
                </div>
              </div>
            </div>
            <div className="form-field">
              <LabelAndTextInput
                labelTitle="都道府県"
                errorMessage={formErrors.prefectures}
                placeholder="都道府県"
                value={formData.prefectures}
                name="prefectures"
                onChange={handleInputChange('prefectures')}
              />
            </div>
            <div className="form-field">
              <LabelAndTextInput
                labelTitle="市区町村"
                errorMessage={formErrors.city}
                placeholder="市区町村"
                value={formData.city}
                name="city"
                onChange={handleInputChange('city')}
              />
            </div>
            <div className="form-field">
              <LabelAndTextInput
                labelTitle="番地"
                errorMessage={formErrors.houseNumber}
                placeholder="番地"
                value={formData.houseNumber}
                name="houseNumber"
                onChange={handleInputChange('houseNumber')}
              />
              <div className="btn-field">
                <CommonButton
                  name="登録"
                  isDisabled={!isFormValid()}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
