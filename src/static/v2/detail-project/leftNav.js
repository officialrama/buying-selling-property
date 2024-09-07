export const navItems = (type) => {
    if(type === "project") {
        return [
                { name: 'Informasi Perumahan', link: '#informasiProperti' },
                { name: 'Pilihan Unit', link: '#pilihanUnit' },
                { name: 'Akses & Fasilitas', link: '#aksesDanfasilitas' },
                { name: 'Video', link: '#video' },
                { name: 'Alamat', link: '#alamat' },
                { name: 'Rekomendasi', link: '#rekomendasi' },
            ]
    } else {
        return [
                { name: 'Informasi Properti', link: '#informasiProperti' },
                { name: 'Akses & Fasilitas', link: '#aksesDanfasilitas' },
                { name: 'Alamat', link: '#alamat' },
                { name: 'Simulasi KPR', link: '#simulasiKpr' },
                { name: 'Ajukan Pembelian', link: '#ajukanPembelian' },
                { name: 'Rekomendasi', link: '#rekomendasi' },
            ]
    }
}