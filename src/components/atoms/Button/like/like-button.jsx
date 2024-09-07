import PropTypes from 'prop-types';

function LikeButton({isLiked}) {
  return (
    <img className="search-result__modalMaps__likeButton" src={isLiked ? "/icons/small-icons/Love_fill.svg" : "/icons/small-icons/Love.svg"} alt="like-button" />
  )
}

LikeButton.propTypes = {
  isLiked: PropTypes.bool.isRequired
}

LikeButton.defaultProps = {
  isLiked: false
}

export default LikeButton