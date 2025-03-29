export function exportToCSV(filename: string, rows: any[]) {
  const csvContent = [
    Object.keys(rows[0]).join(','), // header row
    ...rows.map(row => Object.values(row).join(',')) // data rows
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 