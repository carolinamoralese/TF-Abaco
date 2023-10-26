import { Barrasuperior } from "../Components/Navbar/index";
import { Navbar } from "../Components/Navbar/index";
import Group from "../assets/Group.png";

export function PdfView() {
  const homeStyle = {
    backgroundImage: `url(${Group})`,
    backgroundSize: "80% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "400px",
    position: "relative",
    marginTop: "-30%",
  };

  return (
    <>
      <Barrasuperior />
      <Navbar />
      <div
        style={homeStyle}
        className="relative mt-5 flex flex-col items-center ml-40"
      >
        <div className="flex justify-center">

        </div>
      </div>
    </>
  );
}
