import TotalImages from "../../../atoms/Button/total-images/total-images"
import PropTypes from "prop-types"

function Component({
    dataImg, 
    onClickImg0, 
    onClickImg1, 
    onClickImg2, 
    onClickImg3
}) {
    const filteredImg = dataImg?.filter?.(function (value) {
      return !String(value?.imageName)?.includes("BrosurProyek");
    })

    return (
        <div className="relative overflow-hidden">
          {filteredImg && (
            <div className="prod-detail__pages__property__photos__wrapper-old">
              <div className="prod-detail__pages__property__photos__img-wrap">
                <img
                  className="prod-detail__pages__property__photos__images"
                  src={
                    filteredImg[0] ? filteredImg[0]?.filename.replace('https://sandbox.partner.api.bri.co.id/v1.0/info-lelang/v1/file?subdir', 
                    'https://sandbox.partner.api.bri.co.id/v1.0/info-lelang/file?subdir') : "/images/default.jpg"
                  }
                  alt="images"
                  onClick={onClickImg0}
                />
              </div>
              <div className="prod-detail__pages__property__photos__img-wrap">
                <img
                  className="prod-detail__pages__property__photos__images"
                  src={
                    filteredImg[1] ? filteredImg[1]?.filename.replace('https://sandbox.partner.api.bri.co.id/v1.0/info-lelang/v1/file?subdir', 
                    'https://sandbox.partner.api.bri.co.id/v1.0/info-lelang/file?subdir') : "/images/default.jpg"
                  }
                  alt="images"
                  onClick={onClickImg1}
                />
              </div>
              <div className="prod-detail__pages__property__photos__img-right-wrap">
                <img
                  className="prod-detail__pages__property__photos__images"
                  src={
                    filteredImg[2] ? filteredImg[2]?.filename.replace('https://sandbox.partner.api.bri.co.id/v1.0/info-lelang/v1/file?subdir', 
                    'https://sandbox.partner.api.bri.co.id/v1.0/info-lelang/file?subdir') : "/images/default.jpg"
                  }
                  alt="images"
                  onClick={onClickImg2}
                />
                <img
                  className="prod-detail__pages__property__photos__images"
                  src={
                    filteredImg[3] ? filteredImg[3]?.filename.replace('https://sandbox.partner.api.bri.co.id/v1.0/info-lelang/v1/file?subdir', 
                    'https://sandbox.partner.api.bri.co.id/v1.0/info-lelang/file?subdir') : "/images/default.jpg"
                  }
                  alt="images"
                  onClick={onClickImg3}
                />
              </div>
            </div>
          )}
          <div className="right-[13rem]">
            <TotalImages total={filteredImg?.length} />
          </div>
        </div>
      )
}

Component.propTypes = {
    onClickImg0: PropTypes.func,
    onClickImg1: PropTypes.func,
    onClickImg2: PropTypes.func,
    onClickImg3: PropTypes.func,
}
  
Component.defaultProps = {
    onClickImg0: [() => {}],
    onClickImg1: [() => {}],
    onClickImg2: [() => {}],
    onClickImg3: [() => {}]
}
  
export default Component