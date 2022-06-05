export type ItemProps = {
  item: any;
  template: (item: any) => JSX.Element | string;
};
