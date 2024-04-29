

function _UMUR(tanggal) {
 const sekarang = new Date();
    const lahir = new Date(tanggal);
    let umur = sekarang.getFullYear() - lahir.getFullYear();
    const bulanSekarang = sekarang.getMonth();
    const bulanLahir = lahir.getMonth();
    const tanggalSekarang = sekarang.getDate();
    const tanggal2 = lahir.getDate();

    // Penyesuaian umur jika belum melewati hari ulang tahun pada tahun ini
    if (bulanSekarang < bulanLahir || (bulanSekarang === bulanLahir && tanggalSekarang < tanggal2)) {
        umur--;
    }

    return umur
}

export default _UMUR