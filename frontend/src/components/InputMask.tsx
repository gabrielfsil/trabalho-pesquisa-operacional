import React, { InputHTMLAttributes } from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

interface InputMaskProps extends InputHTMLAttributes<any> {}

function InputMask({ ...rest}: InputMaskProps) {
  const currencyMask = createNumberMask({
    prefix: "R$",
    suffix: "",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ".",
    allowDecimal: true,
    decimalSymbol: ",",
    decimalLimit: 2,
    allowNegative: false,
  });

  return (
    <MaskedInput
      mask={currencyMask}
      {...rest}
      style={{
        border: "1px solid #c9c9c9",
      }}
    />
  );
}

export { InputMask };
