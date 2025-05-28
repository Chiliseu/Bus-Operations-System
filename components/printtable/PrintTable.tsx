import React from 'react';

interface PrintTableProps<T> {
  title: string;
  subtitle: string;
  data: T[];
  columns: { header: string; accessor: (row: T) => React.ReactNode }[];
  filterInfo?: string;
}

function PrintTable<T>({ title, subtitle, data, columns, filterInfo }: PrintTableProps<T>) {
  return (
    <div id="print-section">
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2>Agila Bus Company</h2>
        <h4>{title}</h4>
        <div>Printed on: {new Date().toLocaleString()}</div>
        <div>Filter: {filterInfo || 'None'}</div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} border={1}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr key={i}>
                {columns.map((col, idx) => (
                  <td key={idx}>{col.accessor(row)}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>No records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PrintTable;