import classNames from "classnames";
import { TextColor } from "../../../theme/text/text";

function Virtual360({ onClick }) {
  return (
    <button className="px-1 py-2 bg-white mr-2 border border-solid border-[#E4E7EC] shadow-lg rounded-lg w-fit flex flex-row gap-2 mb-10" onClick={onClick}>
      <img className="place-self-center" src="/icons/small-icons/3D-blue.svg" alt="3D" />
      <p className={classNames("font-medium", "text-[1rem]", `text-[${TextColor.blue}]`, "place-self-center")}>Lihat Virtual 360</p>
    </button>
  )
}

export default Virtual360;