import ConfimationAndAlert from "../../../Componets/alertingComponent/confirmationAndAlert";
const Cancelpayment = () => {
  return (
    <ConfimationAndAlert
      ImageInfo={{
        url: "https://cdn.pixabay.com/photo/2013/07/12/12/44/cancel-146131_640.png",
        alt: "cancel",
      }}
      message={"payment cancel"}
      route={"/"}
      btnText={"try again"}
    />
  );
};


export default Cancelpayment;   