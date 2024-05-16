import { useCallback } from "react";

interface ErrorMessageProps {
  messageID: string;
  firstReplaceElement: string;
  secondReplaceElement?: string;
}

const useDspErrorMessage = () => {
  const getErrorMessage = useCallback(({ messageID, firstReplaceElement, secondReplaceElement }: ErrorMessageProps): string => {

    const messages: Record<string, string> = {
      m01E: `${firstReplaceElement}を入力してください。`,
      m02E: `${firstReplaceElement}の形式で入力してください。`,
      m03E: `${firstReplaceElement}文字以上で入力してください。`,
      m04E: `入力された${firstReplaceElement}が一致しません。`,
      m05E: `${firstReplaceElement}は${secondReplaceElement}文字以上で入力してください。`,
      m06E: `ファイル形式は${firstReplaceElement}もしくは${secondReplaceElement}にしてください。`,
      m07E: `${firstReplaceElement}が正しくありません。入力内容を確認してください。`,
    }
    return messages[messageID] || ""
  }, []);

  return getErrorMessage;
}

export default useDspErrorMessage;