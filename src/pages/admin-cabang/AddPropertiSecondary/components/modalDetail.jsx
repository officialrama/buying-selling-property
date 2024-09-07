import { useState, useEffect } from "react"
import ModalReferral from "../../../../components/molecules/Modal/modal-referral"

const ModalDetail = ({
    inputs,
    setInputs,
    isModal,
    closeModal
}) => {
    const onSubmit = () => {
        setInputs({
            ...inputs,
        })
    }

    return (
        <ModalReferral
            isModal={isModal}
            closeModal={closeModal}
            title="Detail Properti"
        >
            <div className="">

            </div>
        </ModalReferral>
    )
}

export default ModalDetail