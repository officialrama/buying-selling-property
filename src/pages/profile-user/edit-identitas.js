import IdentitasForm from "../../components/organisms/Form/update-identitas";
function EditIdentitas() {
  return (
    <div className="forgot-pass__basePage">
      <IdentitasForm title="Edit Identitas" bodyType="identitas" />
      <p className="forgot-pass__copyright">© {new Date().getFullYear()} PT. Bringin Inti Teknologi (BIT) | All Rights Reserved.</p>
    </div>
  )
}

export default EditIdentitas