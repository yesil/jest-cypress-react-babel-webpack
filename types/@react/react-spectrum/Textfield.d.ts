import * as React from "react";

interface TextfieldProps {
  value?: string;
  quiet?: boolean;
  autocapitalize?: string;
  type?: string;
  placeholder?: string;
  onChange?: (newValue: string) => void;
}
export default class Textfield extends React.Component<TextfieldProps, any> {}
