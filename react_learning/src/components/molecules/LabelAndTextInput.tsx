import React from "react";
import { TextInput, ErrorMsg } from "../atoms";

type Props = {
  labelTitle: string;
  errorMessage?: string;
  name?: string;
  type?: string;
} & TextInputProps;

type TextInputProps = React.ComponentProps<typeof TextInput>;
export const LabelAndTextInput = ({labelTitle, errorMessage, name, type, ...props}:Props) => {
  return (
    <>
      <label>
        {labelTitle}
        <div>
          <TextInput {...props} />
        </div>
      </label>
      {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
    </>
  );
};
