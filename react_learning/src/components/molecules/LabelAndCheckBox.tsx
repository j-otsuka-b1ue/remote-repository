import { useState } from "react";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

type LabelProps = {
  labelTitle: string;
}

export const LabelAndCheckBox = ({ labelTitle }: LabelProps): React.JSX.Element => {
  const [isChecked, isSetChecked] = useState(false);

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    isSetChecked(event.target.checked);
  }

  return (
    <FormControlLabel
      control={
        <CheckBox
          checked={isChecked}
          onChange={handleCheckedChange}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      }
      label={labelTitle}
    />
  )
}