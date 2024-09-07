const brinsOtoTable = [
    {
        resiko: "Kerugian total",
        silver: true,
        gold: true,
        platinum: true
    },
    {
        resiko: "Kerugian sebagian",
        silver: false,
        gold: true,
        platinum: true
    },
    {
        resiko: "Tanggung jawab hukum pihak ketiga",
        silver: true,
        gold: true,
        platinum: true
    },
    {
        resiko: "Angin topan, badai, kerusakan akibat air",
        silver: true,
        gold: false,
        platinum: true
    },
    {
        resiko: "Kerusuhan, pemogokan, penghalangan bekerja, perbuatan jahat, huru-hara, dan penjarahan yang tercantum dalam polis (RSMDCC)",
        silver: true,
        gold: false,
        platinum: true
    },
    {
        resiko: "Terorisme dan sabotase",
        silver: true,
        gold: false,
        platinum: true
    },
    {
        resiko: "Gempa bumi, tsunami, letusan gunung berapi",
        silver: true,
        gold: false,
        platinum: true
    },
    {
        resiko: "Kecelakaan pengemudi",
        silver: true,
        gold: false,
        platinum: true
    },
    {
        resiko: "Kecelakaan diri 4 penumpang",
        silver: true,
        gold: false,
        platinum: true
    },
]

const brinsAsriTable = [
    {
        resiko: "Kebakaran, petir, ledakan, kejatuhan pesawat terbang, asap",
        silver: true,
        gold: true,
        platinum: true
    },
    {
        resiko: "Tanggung jawab hukum pihak ketiga",
        silver: false,
        gold: true,
        platinum: true
    },
    {
        resiko: "Banjir, angin topan, badai, kerusakan akibat air",
        silver: false,
        gold: true,
        platinum: true
    },
    {
        resiko: "Kerusuhan, pemogokan, penghalangan bekerja, perbuatan jahat, huru-hara, dan penjarahan yang tercantum dalam polis (RSMDCC)",
        silver: false,
        gold: true,
        platinum: true
    },
    {
        resiko: "Terorisme dan sabotase",
        silver: false,
        gold: true,
        platinum: true
    },
    {
        resiko: "Kebongkaran",
        silver: false,
        gold: true,
        platinum: true
    },
    {
        resiko: "Santunan duka meninggal dunia dan cacat tetap akibat kecelakaan",
        silver: false,
        gold: true,
        platinum: true
    },
    {
        resiko: "Santunan biaya pengobatan atau perawatan medis",
        silver: false,
        gold: true,
        platinum: true
    },
    {
        resiko: "Bantuan sewa rumah tinggal",
        silver: false,
        gold: true,
        platinum: true
    },
    {
        resiko: "Gempa bumi, tsunami, letusan gunung berapi",
        silver: false,
        gold: false,
        platinum: true
    },
]

const leftNav = [
    {
        name: "Informasi Umum",
        href: "#informasiUmum",
        active: false
    },
    {
        name: "Pengajuan Premi",
        href: "#pengajuanPremi",
        active: false
    },
    {
        name: "FAQ",
        href: "#faq",
        active: false
    },
    {
        name: "Bantuan",
        href: "#bantuan",
        active: false
    },
    {
        name: "Produk Lainnya",
        href: "#produkLainnya",
        active: false
    },
]

const platCode = [
    { "kota": "Jakarta", "name": "B" },
    { "kota": "Surabaya", "name": "L" },
    { "kota": "Bandung", "name": "D" },
    { "kota": "Yogyakarta", "name": "AB" },
    { "kota": "Semarang", "name": "H" },
    { "kota": "Medan", "name": "BK" },
    { "kota": "Makassar", "name": "DD" },
    { "kota": "Denpasar", "name": "DK" },
    { "kota": "Palembang", "name": "BG" },
    { "kota": "Malang", "name": "N" },
    { "kota": "Banjarmasin", "name": "DA" },
    { "kota": "Balikpapan", "name": "KT" },
    { "kota": "Pekanbaru", "name": "BM" },
    { "kota": "Manado", "name": "DB" },
    { "kota": "Pontianak", "name": "KB" },
    { "kota": "Samarinda", "name": "KT" },
    { "kota": "Batam", "name": "BP" },
    { "kota": "Padang", "name": "BA" },
    { "kota": "Aceh", "name": "BL" },
    { "kota": "Solo", "name": "AD" },
    { "kota": "Cirebon", "name": "E" },
    { "kota": "Tasikmalaya", "name": "Z" },
    { "kota": "Tangerang", "name": "A" },
    { "kota": "Bekasi", "name": "B" },
    { "kota": "Depok", "name": "B" },
    { "kota": "Bogor", "name": "F" },
    { "kota": "Garut", "name": "Z" },
    { "kota": "Sukabumi", "name": "F" },
    { "kota": "Purwokerto", "name": "R" },
    { "kota": "Cilacap", "name": "R" },
    { "kota": "Bengkulu", "name": "BD" },
    { "kota": "Lampung", "name": "BE" },
    { "kota": "Jambi", "name": "BH" },
    { "kota": "Mataram", "name": "DR" },
    { "kota": "Kupang", "name": "DH" },
    { "kota": "Palu", "name": "DN" },
    { "kota": "Ambon", "name": "DE" },
    { "kota": "Jayapura", "name": "PA" },
    { "kota": "Banda Aceh", "name": "BL" },
    { "kota": "Bengkalis", "name": "BM" },
    { "kota": "Riau", "name": "BM" },
    { "kota": "Tanjung Pinang", "name": "BP" },
    { "kota": "Lampung Selatan", "name": "BE" },
    { "kota": "Pontianak", "name": "KB" },
    { "kota": "Sintang", "name": "KB" },
    { "kota": "Pangkalan Bun", "name": "KH" },
    { "kota": "Palangkaraya", "name": "KH" },
    { "kota": "Banjarmasin", "name": "DA" },
    { "kota": "Sampit", "name": "KH" },
    { "kota": "Balikpapan", "name": "KT" },
    { "kota": "Samarinda", "name": "KT" },
    { "kota": "Tarakan", "name": "KT" },
    { "kota": "Gorontalo", "name": "DM" },
    { "kota": "Mamuju", "name": "DC" },
    { "kota": "Palu", "name": "DN" },
    { "kota": "Makassar", "name": "DD" },
    { "kota": "Parepare", "name": "DP" },
    { "kota": "Manado", "name": "DB" },
    { "kota": "Bitung", "name": "DB" },
    { "kota": "Ternate", "name": "DG" },
    { "kota": "Ambon", "name": "DE" },
    { "kota": "Sorong", "name": "PB" },
    { "kota": "Jayapura", "name": "PA" }
  ]

const FIDWilayahKendaraan = [
    {"value" : 1, "name" : "Sumatera dan Kepulauan Sekitarnya"},
    {"value" : 2, "name" : "DKI Jakarta, Jawa Barat dan Banten"},
    {"value" : 3, "name" : "Selain Wilayah 1 dan Wilayah 2"}
]
  

export const StaticAsuransiBrins = {
    brinsOtoTable,
    brinsAsriTable,
    leftNav,
    platCode,
    FIDWilayahKendaraan
}