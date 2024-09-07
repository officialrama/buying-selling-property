import classNames from "classnames";
import PropTypes from "prop-types";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Color } from "../../../../theme/color/color";


function Component({ status, onClickEdit, onClickDelete, index, no, nama, stok, tipe,view, wishlist, projectId, from }) {
  const navigate = useNavigate();
  return (
    <>
      {tipe === "cluster" &&
        <tr key={index} className={classNames("border-b border-solid", `border-[${Color.grayLine}]`)}>
          <td className="p-3 align-middle">
            {nama}
          </td>
          <td className="p-3 align-middle">
            {stok}
          </td>
          <td className="p-3 align-middle">
            {tipe}
          </td>
          <td className="p-3 align-middle">
            {status}
          </td>          
          <td className="p-3 align-middle">
            -
          </td>
          <td className="p-3 align-middle">
            -
          </td>
          {status !== "deleted" &&
            <td className="p-3 justify-end align-middle">
              <div className="tbl-list-unit__icon-wrap">
                <MdRemoveRedEye title="Lihat" className="tbl-list-unit__icon" onClick={() => {
                  if (!!from) {
                    navigate(`/sell-property/v2/upload-project/edit-cluster/${encodeURIComponent(no)}?from=${from}&prjId=${encodeURIComponent(projectId)}`);
                  } else {
                    navigate(`/sell-property/v2/upload-project/edit-cluster/${encodeURIComponent(no)}?prjId=${encodeURIComponent(projectId)}`);
                  }
                }} />
              </div>
            </td>
          }
        </tr>
      }
      {tipe === "unit" &&
        <tr key={index} className={classNames("border-b border-solid", `border-[${Color.grayLine}]`)}>
          <td className="p-3 align-middle">
            {nama}
          </td>
          <td className="p-3 align-middle">
            {stok}
          </td>
          <td className="p-3 align-middle">
            {tipe}
          </td>
          <td className="p-3 align-middle">
            {status}
          </td>
          <td className="p-3 align-middle">
            {wishlist}
          </td>
          <td className="p-3 align-middle">
            {view}
          </td>
          {status !== "deleted" &&
            <td className="p-3 justify-end align-middle">
              <div className="tbl-list-unit__icon-wrap">
                <MdRemoveRedEye title="Lihat" className="tbl-list-unit__icon" onClick={onClickEdit}/>
                {/* <MdDelete className="tbl-list-unit__icon" onClick={onClickDelete} /> */}
              </div>
            </td>
          }
        </tr>
      }
      {tipe === "unitCluster" &&
        <tr key={index} className={classNames("border-b border-solid", `border-[${Color.grayLine}]`)}>
          <td className="p-3 align-middle">
            {Number(index + 1)}
          </td>
          <td className="p-3 align-middle">
            {nama}
          </td>
          <td className="p-3 align-middle">
            {stok}
          </td>
          <td className="p-3 align-middle">
            unit
          </td>
          <td className="p-3 align-middle">
            {status}
          </td>
          <td className="p-3 align-middle">
            {wishlist}
          </td>
          <td className="p-3 align-middle">
            {view}
          </td>
          {status !== "deleted" &&
            <td className="p-3 justify-end align-middle">
              <div className="tbl-list-unit__icon-wrap">
                <MdRemoveRedEye title="Lihat" className="tbl-list-unit__icon" onClick={onClickEdit} />
                {/* <MdDelete className="tbl-list-unit__icon" onClick={onClickDelete} /> */}
              </div>
            </td>
          }
        </tr>
      }
    </>
  );
}

Component.propTypes = {
  thumbSrc: PropTypes.string.isRequired,
  no: PropTypes.string.isRequired,
  nama: PropTypes.string.isRequired,
  stok: PropTypes.string.isRequired,
  tipe: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  wishlist: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

Component.defaultProps = {
  thumbSrc: "",
  no: "",
  nama: "",
  stok: "",
  tipe: "",
  status:"",
  view: "",
  wishlist: "",
  onClickEdit: [() => { }],
  onClickDelete: [() => { }],
};

export default Component;
