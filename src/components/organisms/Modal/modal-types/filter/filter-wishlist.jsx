import React from 'react';
import { Button } from "flowbite-react";

function FilterWishlist({ otherProps }) {

    const handleChecked = (value) => {

        if (!otherProps.filterCheck.includes(value)) {
            otherProps.setFilterCheck([...otherProps.filterCheck, value]);
        } else {
            otherProps.setFilterCheck(otherProps.filterCheck.filter(item => item !== value));
        }
    }

    const ResetFilter = () => {
        otherProps.setFilterCheck([])
    }

    return (
        <div class="grid grid-cols-2  mobile:grid-cols-1  gap-2">
            <div class="col-span-1">
                <div class="flex flex-row space-x-2 mb-2">
                    <div className={`${otherProps.filterCheck.includes("all") ? "border bg-blue-800 text-white" : "border border-gray-400 text-gray-400"}  p-2 text-center rounded-full`} onClick={(e) => handleChecked("all")}>Semua</div>
                    <div className={`${otherProps.filterCheck.includes("namaUser") ? "border bg-blue-800 text-white" : "border border-gray-400 text-gray-400"}  p-2 text-center rounded-full`} onClick={(e) => handleChecked("namaUser")}>Visitor</div>
                    <div className={`${otherProps.filterCheck.includes("email") ? "border bg-blue-800 text-white" : "border border-gray-400 text-gray-400"}  p-2 text-center rounded-full`} onClick={(e) => handleChecked("email")}>Email</div>
                </div>
                <div class="flex flex-row space-x-2 mb-2">
                    <div className={`${otherProps.filterCheck.includes("namaProyek") ? "border bg-blue-800 text-white" : "border border-gray-400 text-gray-400"}  p-2 text-center rounded-full`} onClick={(e) => handleChecked("namaProyek")}>Proyek</div>
                    <div className={`${otherProps.filterCheck.includes("namaProperti") ? "border bg-blue-800 text-white" : "border border-gray-400 text-gray-400"}  p-2 text-center rounded-full`} onClick={(e) => handleChecked("namaProperti")}>Properti</div>
                    <div className={`${otherProps.filterCheck.includes("namaDeveloper") ? "border bg-blue-800 text-white" : "border border-gray-400 text-gray-400"}  p-2 text-center rounded-full`} onClick={(e) => handleChecked("namaDeveloper")}>Developer</div>
                </div>
                <div class="flex flex-row space-x-2 mb-1">
                    <div className={`${otherProps.filterCheck.includes("mobileNo") ? "border bg-blue-800 text-white" : "border border-gray-400 text-gray-400"}  p-2 text-center rounded-full`} onClick={(e) => handleChecked("mobileNo")}>No. Handphone</div>
                    <div className={`${otherProps.filterCheck.includes("tipe") ? "border bg-blue-800 text-white" : "border border-gray-400 text-gray-400"}  p-2 text-center rounded-full`} onClick={(e) => handleChecked("tipe")}>Status</div>
                </div>
            </div>
            <div class="col-span-1 mobile:border-t-2 border-slate-200 ">
                <div class="grid grid-cols-2 gap-2 mb-14 mobile:pt-4">
                    <div class="col-span-1">
                        <div className={`${otherProps.filterCheck.includes("sortbyDateDesc") ? "border bg-blue-800 text-white" : "border border-gray-400 text-gray-400"}  p-2 text-center rounded-full`} onClick={(e) => handleChecked("sortbyDateDesc")}>Terkini</div>
                    </div>
                    <div class="col-span-1">
                        <div className={`${otherProps.filterCheck.includes("sortbyDateAsc") ? "border bg-blue-800 text-white" : "border border-gray-400 text-gray-400"}  p-2 text-center rounded-full`} onClick={(e) => handleChecked("sortbyDateAsc")}>Terdahulu</div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2 bottom-0">
                    <div class="col-span-1">
                        <Button color="gray" className='w-full' onClick={ResetFilter}>
                            Reset
                        </Button>
                    </div>
                    <div class="col-span-1">
                        <Button className='w-full' onClick={otherProps.applyFilter}>
                            Terapkan
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FilterWishlist