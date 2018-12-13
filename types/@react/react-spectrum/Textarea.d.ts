import * as React from "react";

interface TextareaProps {
  ref?: any;
  placeholder?: string;
  onChange?: (newValue: string) => void;
}
export default class Textarea extends React.Component<TextareaProps, any> {}
