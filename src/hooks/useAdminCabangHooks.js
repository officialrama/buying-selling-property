import { useState } from "react"
import {
    emailRegex,
    nameRegex,
    passwordRegex
} from "../helpers/regex"

const useAdminCabangHooks = () => {
    const [inputs, setInputs] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [cari, setCari] = useState("")
    const [listAdminCabang, setListAdminCabang] = useState([])
    const [referralId, setReferralId] = useState("")
    const [referralEmail, setReferralEmail] = useState("")
    const [referralName, setReferralName] = useState("")
    const [dataTemp, setDataTemp] = useState({
      originalRows: [],
      rows: [],
      search: ""
    })

    const [bodyListOfUser, setBodyListOfUser] = useState({
      keyword: "",
      pageStart: 0,
    })

    const handleSearchChange = (event) => {
      setCari(event.target.value)
    }

    const handleName = (event) => {
        event.presist()
        if(!nameRegex.test(event.target.value)) {
            setInputs({
                ...inputs,
                [event.target.name]: { 
                    isValid: false, 
                    value: event.target.value, 
                    msgError: "Nama Lengkap yang dimasukkan belum benar"
                },
            })
        } else {
            setInputs({
                ...inputs,
                [event.target.name]: { 
                    isValid: true, 
                    value: event.target.value, 
                    msgError: "" 
                },
            })
        }
    }

    const handleEmail = (event) => {
        event.persist();
        setInputs((inputs) => ({
          ...inputs,
          [event.target.name]: event.target.value,
        }))
        if (!emailRegex.test(event.target.value)) {
          setInputs({
            ...inputs,
            [event.target.name]: {
              isValid: false,
              value: event.target.value,
              msgError: "Email yang dimasukkan belum sesuai",
            },
          });
        } else {
          setInputs({
            ...inputs,
            [event.target.name]: {
              isValid: true,
              value: event.target.value,
              msgError: "",
            },
          })
        }
      }

      const handlePass = event => {
        var rules = [
          { test: (str) => /[A-Z]/.test(str), message: "Password minimal memiliki satu huruf besar." },
          { test: (str) => /[a-z]/.test(str), message: "Password minimal memiliki satu huruf kecil." },
          { test: (str) => /[^a-zA-Z0-9]/.test(str), message: "Password minimal memiliki satu angka dan simbol spesial." },
          { test: (str) => str.length >= 8, message: "Password minimal berjumlah 8 karakter." },
          { test: (str) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(str), message: "Password minimal berjumlah 8 karakter, harus memiliki huruf besar, huruf kecil, angka dan simbol spesial" }
        ]
        event.persist()
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
        for (var i = 0; i < rules.length; i++) {
          if (!rules[i].test(event.target.value)) {
              setInputs({
                    ...inputs,
                    [event.target.name]: { isValid: false, value: event.target.value, msgError: rules[i].message },
                });
                return;
            }
        }
        setInputs({
            ...inputs,
            [event.target.name]: { isValid: true, value: event.target.value, msgError: "" },
        })
      }

      return {
        inputs,
        setInputs,
        handleName,
        handleEmail,
        handlePass,
        bodyListOfUser,
        cari,
        setCari,
        handleSearchChange,
        setBodyListOfUser,
        dataTemp,
        setDataTemp,
        listAdminCabang,
        setListAdminCabang,
        editMode,
        setEditMode,
        referralId,
        setReferralId,
        referralEmail,
        setReferralEmail,
        referralName,
        setReferralName
      }
}

export default useAdminCabangHooks
