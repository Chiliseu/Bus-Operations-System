import React, { forwardRef } from "react";

const PrintableContent = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref}>
      dfhsjkdhfgjklsghdfghsjdgfljshndlfjkghslkjdfhgklsjhdfjklg
    </div>
  );
});

export default PrintableContent;
