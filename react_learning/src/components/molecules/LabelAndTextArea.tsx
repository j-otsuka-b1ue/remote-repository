import React from "react";
import { ErrorMsg, Textarea } from "../atoms";

type Props = {
  labelTitle: string;
  errorMessage?: string;
} & TextareaProps;

type TextareaProps = React.ComponentProps<typeof Textarea>;

export const LabelAndTextArea = ({labelTitle, errorMessage, ...props}:Props)=> {
  return (
    <>
      <label>
        {labelTitle}
        <div>
          <Textarea {...props} />
        </div>
      </label>
      {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
    </>
  );
};
