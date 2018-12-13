import * as React from "react";

interface FormProps {
  className?: string;
}
export class Form extends React.Component<FormProps, any> {}

interface FormItemProps {
  label: string;
}
export class FormItem extends React.Component<FormItemProps, any> {}
