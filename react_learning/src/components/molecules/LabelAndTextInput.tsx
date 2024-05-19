import React, { useState } from "react";
import { TextInput, ErrorMsg } from "../atoms";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


type Props = {
  labelTitle: string;
  errorMessage?: string;
  name?: string;
  type?: string;
} & TextInputProps;

type TextInputProps = React.ComponentProps<typeof TextInput>;

export const LabelAndTextInput = ({ labelTitle, errorMessage, name, type = "text", ...props }: Props) => {

  const [isPasswordVisibled, setIsPasswordVisibled] = useState(false);

  const handleClickShowPassword = (): void => {
    setIsPasswordVisibled(!isPasswordVisibled);
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }
  return (
    <>
      <label>
        {labelTitle}
        <div>
          <TextInput
            type={isPasswordVisibled ? "text" : type}
            {...props}
            InputProps={
              type === "password" ?
                {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {isPasswordVisibled ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                } : undefined}
          />
        </div>
      </label>
      {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
    </>
  );
};
