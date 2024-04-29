import React from "react"


function _Converter(data) {
 let xz = []
 for (let i of Object.entries(data)) {
  let type = typeof i[1];
  if (i[0] === "tanggalLahir" || i[0]==="tanggal") {
      type = "date";
  }
  xz.push({
      name: i[0],
      val: i[1],
      type: type,
      pattern: i[0] === "tanggalLahir" || i[0] === "tanggal" ? "\\d{4}-\\d{2}-\\d{2}" : undefined
  });
}
return xz;
}

export default _Converter