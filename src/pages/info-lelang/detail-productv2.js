import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const DetailProduct = ({email, emailView, userStatus, isType}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
}

export default DetailProduct