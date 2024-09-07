import { Button } from "../../../../atoms"

function FooterCashSubmission() {
  return(
    <div>
      <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"}>Konfirmasi Sudah Membayar</Button>
      <div className="mb-3" />
      <Button buttonColor="noBgColor" textColor="gray2" fullWidth={true} paddingSize={"padding-1"}>Batalkan Transaksi</Button>
    </div>
  )
}

export default FooterCashSubmission