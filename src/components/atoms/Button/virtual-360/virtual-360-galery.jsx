import classNames from "classnames";
import { TextColor } from "../../../theme/text/text";

function Virtual360({ onClick }) {
  return (
    <button className="px-4 py-2 bg-white mx-4 my-12 border border-solid border-[#1078CA] shadow-lg rounded-lg w-fit flex flex-row gap-2" onClick={onClick}>
      <img className={classNames("place-self-center", "filter", `filter-[${TextColor.blue}]`)} src="/icons/small-icons/3D-blue.svg" alt="3D" />
      <p className={classNames("font-bold", "text-[1rem]", "text-[#1078CA]", "place-self-center")}>Virtual 360°</p>
    </button>
  )
}

export default Virtual360;