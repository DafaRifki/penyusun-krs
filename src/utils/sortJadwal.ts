const hariOrder = [
  "senin",
  "selasa",
  "rabu",
  "kamis",
  "jumat",
  "sabtu",
  "minggu",
];

export function sortByHariJam(data: any[]) {
  return [...data].sort((a, b) => {
    const [hariA, jamA] = a.jadwal.toLowerCase().split(",");
    const [hariB, jamB] = b.jadwal.toLowerCase().split(",");

    const hariIndexA = hariOrder.indexOf(hariA.trim());
    const hariIndexB = hariOrder.indexOf(hariB.trim());

    if (hariIndexA !== hariIndexB) {
      return hariIndexA - hariIndexB;
    }

    const jamMulaiA = jamA?.trim().split("-")[0] || "";
    const jamMulaiB = jamB?.trim().split("-")[0] || "";

    return jamMulaiA.localeCompare(jamMulaiB);
  });
}
