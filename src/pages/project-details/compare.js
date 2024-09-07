import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { BackBreadcrumbs, Footer } from "../../components/molecules"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import UnitCompare from "../../components/organisms/Card/product-details/unit-compare"
import { inquiryCompareProp } from '../../store/actions/fetchData/v2/compareProp';
import { fasilitasUnitDetail } from "../../store/actions/fetchData/v2/detailProjectV2"
import { Breadcrumb } from "flowbite-react"


const Compare = ({email, emailView}) => {
    const { id, secondId } = useParams()
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [fas1, setFas1] = useState([])
    const [fas2, setFas2] = useState([])
    const saState = useSelector((state) => state.superAdminReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [queryParam] = useSearchParams()
    const [dataFromParams, setDataFromParams] = useState({
        isSecondary: false,
        from: "-"
    })

    useEffect(() => {
        setDataFromParams({
            isSecondary: queryParam?.get("secondary") ?? false,
            from: queryParam?.get("from") ?? "-"
        })
    }, [])

    useEffect(() => {
        dispatch(inquiryCompareProp({
          id1: id,
          id2: secondId,
          email: email,
          setData1: setData1,
          setData2: setData2
        }));
        dispatch(fasilitasUnitDetail({
            unitId: decodeURIComponent(id),
            setData: setFas1,
            setLoading: () => {}
        }))
        dispatch(fasilitasUnitDetail({
            unitId: decodeURIComponent(secondId),
            setData: setFas2,
            setLoading:  () => {}
        }))
    }, [secondId])
    
    const capitalizeWords = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return (
    <>
        <div className="comp-prop__wrapper">
            <div className="max-w-[1116px] mx-auto my-0 flex-grow-0 flex pb-6 pt-4">
                <Breadcrumb>
                    <span className="text-sm cursor-pointer text-[#1078CA] font-semibold" onClick={() => navigate('/') } >Home</span>
                    {dataFromParams?.isSecondary && (
                        <Breadcrumb.Item>
                            <span className="text-sm text-[#1078CA] font-semibold">Properti Second</span>
                        </Breadcrumb.Item>
                    )}
                    <Breadcrumb.Item>
                        <span className="text-sm cursor-pointer text-[#1078CA] font-semibold" onClick={() => navigate('..', { relative: 'path' })}>{capitalizeWords(dataFromParams?.from)}</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span className="text-sm text-[#777777] font-medium">Bandingkan Properti</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="comp-prop__page-2">
                <div className="comp-prop__page-left">
                    <UnitCompare data={data2} images={data2?.imagesProperti} dev={data2?.dataDev} dispatch={dispatch} fasData={fas2} />
                </div>
                <div className="comp-prop__div-vertical" />
                <div className="comp-prop__page-right">
                    <UnitCompare data={data1} images={data1?.imagesProperti} dev={data1?.dataDev} dispatch={dispatch} fasData={fas1} />
                </div>
            </div>
        </div>
    </>
    )
}

export default Compare