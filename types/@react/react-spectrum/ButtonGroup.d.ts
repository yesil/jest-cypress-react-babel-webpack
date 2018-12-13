import * as React from "react";

interface ButtonGroupProps {
  style: any;
  "aria-label": string;
  onClick: (button: string) => void;
  orientation: string;
}

declare class ButtonGroup extends React.Component<ButtonGroupProps, any> {}

export default ButtonGroup;
