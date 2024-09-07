function BackBreadcrumbs({ onClick, title = "" }) {
  return (
    <div className="prod-detail__pages__breadcrumb__back__topWrapper">
      <div onClick={onClick} className="prod-detail__pages__breadcrumb__back__wrapper">
        <img className="my-auto" src="/icons/small-icons/Left.svg" alt="left-icon" />
        <p className="prod-detail__pages__breadcrumb__back__text">
          Kembali ke Sebelumnya
        </p>
      </div>
      <span>{title}</span>
    </div>
  );
}
export default BackBreadcrumbs;
