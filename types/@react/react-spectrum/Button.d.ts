import * as React from "react";

interface ButtonProps {
  className?: string;
  variant?: string;
  quiet?: boolean;
  icon?: React.ReactNode;
  onClick?: (e: any) => void;
}

declare class Button extends React.Component<ButtonProps, any> {}

export default Button;
