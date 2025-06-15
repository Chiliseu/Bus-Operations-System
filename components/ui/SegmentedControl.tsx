import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { SegmentedControlProps } from "@/app/interface/segmented-control";

export default function SegmentedControl({
  options,
  onSelect,
  defaultValue,
}: SegmentedControlProps) {
  const [selected, setSelected] = useState(defaultValue || options[0]);

  const handleSelect = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    if (newValue !== null) {
      setSelected(newValue);
      onSelect(newValue);
    }
  };

  return (
    <ToggleButtonGroup value={selected} exclusive onChange={handleSelect}>
      {options.map((option) => (
        <ToggleButton key={option} value={option}>
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
