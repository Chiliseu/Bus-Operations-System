import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const PrintableContent = () => {
  return (
    <div>
      dfhsjkdhfgjklsghdfghsjdgfljshndlfjkghslkjdfhgklsjhdfjklg
    </div>
  );
};

export default function Print() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef, // ✅ use `contentRef` instead of `content`
    documentTitle: "Sample Print Document",
  });

  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <div ref={contentRef}>
        <PrintableContent />
      </div>
    </div>
  );
}
