import * as React from "react";

interface DatepickerProps {
  type: "date" | "datetime";
  value?: string;
  required?: boolean;
  quiet?: boolean;
  placement?: string;
  onChange: (newValue: string) => void;
}

declare class Datepicker extends React.Component<DatepickerProps, any> {}

export default Datepicker;
