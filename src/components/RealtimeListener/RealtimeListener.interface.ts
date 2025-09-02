
export interface RealtimeListenerProps {
  table: string;
  onInsert?: (row: any) => any;
  onUpdate?: (row: any) => any;
  onDelete?: (row: any) => any;
}