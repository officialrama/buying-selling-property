import { LabelInputTextbox } from "../../../atoms";

const Component = ({ optionTypes, label }) => {
  return (
    <div>
      {label !== "" && (
        <div className="mb-2">
          <LabelInputTextbox text={label} />
        </div>
      )}
      <div className="flex justify-center">
        <div className="mb-3 xl:w-full">
          <select
            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
          >
            <option selected>Pilih {label}</option>
            {optionTypes.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Component;
