import PropTypes from "prop-types";
import Slider from "rc-slider";
import { Button, TextboxWithoutShadow } from "../../../atoms";
import { ThemeRcSlider } from "../../../theme/slider/rc-slider";

function Component({
  minRange,
  maxRange,
  defaultValue,
  onChangeSlider,
  handleChangePrice,
  value,
  onClickReset,
  onClickSave,
  classNameWrapper,
}) {
  return (
    <div
      data-popper-placement="bottom"
      className={`slider__wrapper ${classNameWrapper}`}
    >
      <div className="slider__dropdown-wrap">
        <div className="slider__slider-wrap">
          <Slider
            range
            count={1}
            min={minRange}
            max={maxRange}
            defaultValue={defaultValue}
            pushable
            value={value}
            trackStyle={ThemeRcSlider.track}
            handleStyle={[ThemeRcSlider.handle, ThemeRcSlider.handle]}
            railStyle={ThemeRcSlider.track}
            onChange={onChangeSlider}
          />
        </div>
        <div className="slider__price-wrap">
          <div className="w-[48.5%] mobile:w-full">
            <div className="slider__textfield__wrapper">
              <p className="slider__textfield__title">Harga min</p>
              <TextboxWithoutShadow
                typeInput="text"
                value={new Intl.NumberFormat("id-ID").format(value[0])}
                // value={value[0]}
                disablePadding={true}
                fontSemiBold={true}
                onChange={(e) => handleChangePrice(e, "minPrice")}
              />
            </div>
          </div>
          <div className="slider__price-spacer-line" />
          <div className="w-[48.5%] mobile:w-full">
            <div className="slider__textfield__wrapper">
              <p className="slider__textfield__title">Harga max</p>
              <TextboxWithoutShadow
                typeInput="text"
                value={new Intl.NumberFormat("id-ID").format(value[1])}
                // value={value[1]}
                disablePadding={true}
                fontSemiBold={true}
                onChange={(e) => handleChangePrice(e, "maxPrice")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="slider__button__wrapper">
        <button onClick={onClickReset} className="slider__button__reset">
          Reset
        </button>
        <Button
          buttonColor="blue"
          textColor="white"
          fullWidth={false}
          paddingSize={"padding-0"}
          onClick={onClickSave}
        >
          Simpan
        </Button>
      </div>
      <div></div>
    </div>
  );
}

Component.propTypes = {
  minRange: PropTypes.number.isRequired,
  maxRange: PropTypes.number.isRequired,
  value: PropTypes.array.isRequired,
  defaultValue: PropTypes.array.isRequired,
  onChangeSlider: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  classNameWrapper: PropTypes.string,
};

Component.defaultProps = {
  minRange: 100000000,
  maxRange: 10000000000,
  defaultValue: [100000000, 10000000000],
  value: [100000000, 10000000000],
  onChangeSlider: [() => {}],
  onClickReset: [() => {}],
  onClickSave: [() => {}],
  classNameWrapper: "",
};

export default Component;
