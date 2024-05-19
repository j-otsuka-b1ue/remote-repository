

type Props = {
  labelTitle: string;
}
export const TextLabel = ({ labelTitle }: Props): React.JSX.Element => {
  return (
    <label>{labelTitle}</label>
  )
}