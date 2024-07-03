import React from "react";
import { Text } from "@components/ui";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  required?: boolean;
  name?: string;
  register?: UseFormRegisterReturn<string>;
};

export const TextFild = (props: Props) => {
  const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const { required, ...restOfProps } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name} className="font-pregular pl-1">
        {capitalize(props.name!)}:{" "}
        <span className="font-plight text-sm text-red-500">
          {required ? "*" : ""}
        </span>
      </label>
      <input
        className={`bg-black-100 outline-none p-1 px-2 rounded-lg text-sm ${props.className}`}
        {...restOfProps}
        {...props.register}
      />
      {props.error && (
        <div className="pl-1">
          <Text color="danger" type="info">
            {props.error}
          </Text>
        </div>
      )}
    </div>
  );
};
