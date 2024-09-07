import { Toast } from 'flowbite-react';
import React from 'react';
import { Button } from '../../../../atoms';
import { Checkbox } from '../../../../molecules';
import FilterCard from '../../../../molecules/Cards/search/filter/filter-card';

function FilterSubmittedBySales({ otherProps }) {


    const handleChecked = (e) => {

        if (e.target.checked === true) {
            otherProps.setFilterCheck([e.target.name]);
        } else {
            otherProps.setFilterCheck(otherProps.filterCheck.filter(item => item !== e.target.name));
        }
    }

    const ResetFilter = () => {
        otherProps.setFilterCheck([])
    }

    return (
        <>
            <Toast className="text-blue-700 bg-blue-100">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg  text-blue-500 dark:bg-blue-800 dark:text-blue-200">
                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                </div>
                <div className="ml-3 text-sm font-normal ">
                    Silahkan klik "Terapkan Filter" untuk melihat informasi sesuai filter yang anda inginkan
                </div>
            </Toast>
            <div className='my-2'>
                <FilterCard title=" ">
                    <div className="filter-search__wrapper__baseInputTextNoMargin">
                        <div className="filter-search__wrapper__options">
                            <Checkbox label="Nama Sales" fontSize="16px" name="namaSales" checked={otherProps?.filterCheck?.includes("namaSales") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="Nama Developer" fontSize="16px" name="developerName" checked={otherProps?.filterCheck?.includes("developerName") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="Nama Debitur" fontSize="16px" name="customerName" checked={otherProps?.filterCheck?.includes("customerName") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="NIK" fontSize="16px" name="nik" checked={otherProps?.filterCheck?.includes("nik") ? true : false} onChange={(e) => handleChecked(e)} />
                            {/* <Checkbox label="Jenis Proyek" fontSize="16px" name="jenisProyek" checked={otherProps?.filterCheck?.includes("jenisProyek") ? true : false} onChange={(e) => handleChecked(e)} /> */}
                            <Checkbox label="Plafond Pengajuan" fontSize="16px" name="plafondPengajuan" checked={otherProps?.filterCheck?.includes("plafondPengajuan") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="Nominal UTJ" fontSize="16px" name="nominalUTJ " checked={otherProps?.filterCheck?.includes("nominalUTJ ") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="Status Settlement" fontSize="16px" name="sSettlement " checked={otherProps?.filterCheck?.includes("sSettlement ") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="Waktu Settlement" fontSize="16px" name="waktuSettlement " checked={otherProps?.filterCheck?.includes("waktuSettlement ") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="RM" fontSize="16px" name="rm" checked={otherProps?.filterCheck?.includes("rm") ? true : false} onChange={(e) => handleChecked(e)} />
                        </div>
                        <div className="filter-search__wrapper__options">
                            <Checkbox label="Plafond Putusan" fontSize="16px" name="plafondPutusan" checked={otherProps?.filterCheck?.includes("plafondPutusan") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="Tanggal Pengajuan" fontSize="16px" name="createdAt" checked={otherProps?.filterCheck?.includes("createdAt") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="Tanggal Putusan" fontSize="16px" name="tanggalPutusan" checked={otherProps?.filterCheck?.includes("tanggalPutusan") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="Kantor Wilayah" fontSize="16px" name="regionalBranch" checked={otherProps?.filterCheck?.includes("regionalBranch") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="Kantor Cabang" fontSize="16px" name="branchOffice" checked={otherProps?.filterCheck?.includes("branchOffice") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="Pemutus" fontSize="16px" name="pemutus" checked={otherProps?.filterCheck?.includes("pemutus") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="Jenis Proyek" fontSize="16px" name="jenisProperti" checked={otherProps?.filterCheck?.includes("jenisProperti") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="Tipe Properti" fontSize="16px" name="tipeProperti" checked={otherProps?.filterCheck?.includes("tipeProperti") ? true : false} onChange={(e) => handleChecked(e)} />
                            <Checkbox label="Status" fontSize="16px" name="status" checked={otherProps?.filterCheck?.includes("status") ? true : false} onChange={(e) => handleChecked(e)} />
                        </div>
                    </div>
                </FilterCard>
            </div>

            <div className="flex flex-row gap-3">
                <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"} onClick={ResetFilter}>
                    Reset Filter
                </Button>
                <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"} onClick={otherProps.applyFilter}>
                    Terapkan Filter
                </Button>
            </div>
        </>
    )
}

export default FilterSubmittedBySales