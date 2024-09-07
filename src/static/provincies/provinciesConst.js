export const provinciesConst = [
        {
            "id": 20,
            "name": "BALI"
        },
        {
            "id": 3,
            "name": "BANTEN"
        },
        {
            "id": 13,
            "name": "BENGKULU"
        },
        {
            "id": 14,
            "name": "D.I. YOGYAKARTA"
        },
        {
            "id": 2,
            "name": "DKI JAKARTA"
        },
        {
            "id": 28,
            "name": "GORONTALO"
        },
        {
            "id": 12,
            "name": "JAMBI"
        },
        {
            "id": 4,
            "name": "JAWA BARAT"
        },
        {
            "id": 1,
            "name": "JAWA TENGAH"
        },
        {
            "id": 15,
            "name": "JAWA TIMUR"
        },
        {
            "id": 19,
            "name": "KALIMANTAN BARAT"
        },
        {
            "id": 16,
            "name": "KALIMANTAN SELATAN"
        },
        {
            "id": 17,
            "name": "KALIMANTAN TENGAH"
        },
        {
            "id": 18,
            "name": "KALIMANTAN TIMUR"
        },
        {
            "id": 10,
            "name": "KEP BANGKA BLT"
        },
        {
            "id": 8,
            "name": "KEPULAUAN RIAU"
        },
        {
            "id": 33,
            "name": "LAINNYA"
        },
        {
            "id": 11,
            "name": "LAMPUNG"
        },
        {
            "id": 35,
            "name": "LUAR NEGERI"
        },
        {
            "id": 29,
            "name": "MALUKU"
        },
        {
            "id": 30,
            "name": "MALUKU UTARA"
        },
        {
            "id": 5,
            "name": "NANGGROE ACEH D"
        },
        {
            "id": 21,
            "name": "NUSA TENGGARA BARAT"
        },
        {
            "id": 22,
            "name": "NUSA TENGGARA TIMUR"
        },
        {
            "id": 31,
            "name": "PAPUA"
        },
        {
            "id": 32,
            "name": "PAPUA BARAT"
        },
        {
            "id": 7,
            "name": "RIAU"
        },
        {
            "id": 24,
            "name": "SULAWESI BARAT"
        },
        {
            "id": 23,
            "name": "SULAWESI SELATAN"
        },
        {
            "id": 26,
            "name": "SULAWESI TENGAH"
        },
        {
            "id": 25,
            "name": "SULAWESI TENGGARA"
        },
        {
            "id": 27,
            "name": "SULAWESI UTARA"
        },
        {
            "id": 6,
            "name": "SUMATERA BARAT"
        },
        {
            "id": 9,
            "name": "SUMATERA SELATAN"
        },
        {
            "id": 34,
            "name": "SUMATERA UTARA"
        }
    ]
export function matchData(state, value) {
  return (
    state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}