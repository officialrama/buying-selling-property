import { DetailsCard,  ModalGMaps, Textbox, Checkbox} from "../../../components/molecules"
import useFormStepperHooksV2 from "../../../hooks/v2/useFormStepperHooks"
import { useEffect } from "react"

const KelengkapanRumah = ({
    inputs,
    setInputs,
    handleProps
}) =>{
    const CheckboxList = {
        KelengkapanRumah: [
            { label: "Dapur", name: "dapur" },
            { label: "Ruang Keluarga", name: "ruangKeluarga" },
            { label: "Ruang Kerja", name: "ruangKerja" },
            { label: "Jalur Listrik", name: "jalurListrik" },
            { label: "Jalur Telepon", name: "jalurTelepon" },
            { label: "Jalur PDAM", name: "jalurPDAM" }
        ],
        Akses: [
            { label: "Rumah Sakit", name: "rumahSakit"},
            { label: "Jalan Tol", name: "jalanTol"},
            { label: "Sekolah", name: "sekolah"},
            { label: "Mall", name: "mall"},
            { label: "Bank/ATM", name: "bankAtm"},
            { label: "Taman", name: "taman"},
            { label: "Pasar", name: "pasar"},
            { label: "Farmasi", name: "farmasi"},
            { label: "Rumah Ibadah", name: "rumahIbadah"},
            { label: "Restoran", name: "restoran"},
            { label: "Bioskop", name: "bioskop"},
            { label: "Bandara", name: "bandara"},
            { label: "Halte", name: "halte"},
            { label: "Stasiun", name: "stasiun"},
            { label: "SPBU", name: "spbu"}
        ],
        Fasilitas: [
            { label: "Furnished", name: "furnished"},
            { label: "Tempat Parkir", name: "tempatParkir"},
            { label: "Keamanan", name: "keamanan"},
            { label: "Kolam Renang", name: "kolamRenang"},
            { label: "Penghijauan", name: "penghijauan"},
            { label: "Garasi", name: "garasi"},
            { label: "Lift", name: "lift"},
            { label: "Club House", name: "clubHouse"},
            { label: "Internet Provider", name: "internetProvider"},
            { label: "Gym", name: "gym"}
        ]
    }    

    const areAllChecked = (type) => {
        return CheckboxList[type].every((item) => inputs[item.name]);
    }
  
    const activeAll = (type) => {
        const updatedInputs = { ...inputs }
        CheckboxList[type].forEach((item) => {
            updatedInputs[item.name] = true
        })
        setInputs(updatedInputs)
    }
    const deActiveAll = (type) => {
        const updatedInputs = { ...inputs }
        CheckboxList[type].forEach((item) => {
            updatedInputs[item.name] = false
        })
        setInputs(updatedInputs)
    }

    return (
    <div>
                <div className="sellpropsV2__card__wrapper-content">
                    <div className="flex justify-between pb-2">
                        <p className="sellpropsV2__title">Kelengkapan Rumah</p>
                        <button className={areAllChecked("KelengkapanRumah") ? 'properti-secondary__title_2_kelengkapanRumah_active ' : 'properti-secondary__title_2_kelengkapanRumah'} onClick={() => areAllChecked("KelengkapanRumah") ? deActiveAll("KelengkapanRumah") : activeAll("KelengkapanRumah")}>Pilih Semua</button>
                    </div>
                    <div className="sellpropsV2__card__checklist-wrapper">
                        {
                            CheckboxList.KelengkapanRumah.map((item, index) => {
                                return (
                                    <Checkbox 
                                        fontSize="16px"
                                        label={item.label}
                                        name={item.name}
                                        checked={inputs[item.name]} 
                                        onChange={handleProps.handleCheckboxChange}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="sellpropsV2__card__wrapper-content">
                    <div className="flex justify-between pb-2">
                        <p className="sellpropsV2__title">Akses</p>
                        <button className={areAllChecked("Akses") ? 'properti-secondary__title_2_kelengkapanRumah_active ' : 'properti-secondary__title_2_kelengkapanRumah'} onClick={() => areAllChecked("Akses") ? deActiveAll("Akses") : activeAll("Akses")}>Pilih Semua</button>
                    </div>
                    <div className="sellpropsV2__card__checklist-wrapper">
                        {
                            CheckboxList.Akses.map((item, index) => {
                                return (
                                    <Checkbox 
                                        fontSize="16px"
                                        label={item.label}
                                        name={item.name}
                                        checked={inputs[item.name]} 
                                        onChange={handleProps.handleCheckboxChange}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="sellpropsV2__card__wrapper-content">
                <div className="flex justify-between pb-2">
                        <p className="sellpropsV2__title">Fasilitas</p>
                        <button className={areAllChecked("Fasilitas") ? 'properti-secondary__title_2_kelengkapanRumah_active ' : 'properti-secondary__title_2_kelengkapanRumah'} onClick={() => areAllChecked("Fasilitas") ? deActiveAll("Fasilitas") : activeAll("Fasilitas")}>Pilih Semua</button>
                    </div>
                    <div className="sellpropsV2__card__checklist-wrapper">
                        {
                            CheckboxList.Fasilitas.map((item, index) => {
                                return (
                                    <Checkbox 
                                        fontSize="16px"
                                        label={item.label}
                                        name={item.name}
                                        checked={inputs[item.name]}
                                        onChange={handleProps.handleCheckboxChange}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
    </div>
    )
}

export default KelengkapanRumah