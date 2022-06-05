export type ItemListProps = {
  data: Array<any>;
  rowTemplate: (item: any) => JSX.Element | string;
  className?: string;
  pagination?: boolean;
  totalCount?: number;
  row?: number;
  onChangePage?: (page: number) => void;
  loading?: boolean;
};
