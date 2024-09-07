function ModalDetailKanca({
  namaKanca,
  jenisKanca,
  alamatKanca,
  telpKanca
}) {
  
  return (
    <div>
      <div className="search-result__modalMaps__flexWrapper">
        <div className="search-result__modalMaps__maxWidthWrapper">
          <div className="search-result__modalMaps__borderShadow">
            <div className="search-result__modalMaps__paddingWrapper">
              <div className="search-result__modalMaps__detail__baseWrapper">
                <p className="search-result__modalMaps__detail__propName">
                  {namaKanca ? jenisKanca === "KCK" ? namaKanca?.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase()) : `KC. ${namaKanca?.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase())}` : "-"}
                </p>
                <p className="search-result__modalMaps__detail__location ">
                  {alamatKanca ? alamatKanca : "-"}
                </p>
              </div>
              <p className="search-result__modalMaps__phone">{telpKanca ? telpKanca : "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDetailKanca;
