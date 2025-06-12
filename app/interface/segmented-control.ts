export interface SegmentedControlProps {
  options: string[];
  onSelect: (option: string) => void;
  defaultValue?: string;
}
