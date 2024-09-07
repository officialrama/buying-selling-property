import PropTypes from "prop-types";
import { MiniSpinner } from "../..";

function SaveLove({ onClick, loading, filled }) {
  return (
    <div className="save-love-share__wrapper" onClick={onClick}>
      {filled ? 
        <img className="save-love-share__loveIcon" src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/favorite/love-black-filled.svg" alt="love-filled" /> : 
        <img className="save-love-share__loveIcon" src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/favorite/love-black.svg" alt="love" />
      }
      {loading ? <MiniSpinner /> : <p className="save-love-share__text">Simpan</p>}
    </div>
  )
}

SaveLove.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  filled: PropTypes.bool
};

SaveLove.defaultProps = {
  onClick: [() => {}],
  loading: false,
  filled: false
};

export default SaveLove;