declare module "icon" {

}
import * as React from "react";

interface IconProps {
  onClick?: (e: any) => void;
  className?: string;
  size?: string;
  alt?: string;
}

declare class Icon extends React.Component<IconProps, any> {}

export default Icon;
