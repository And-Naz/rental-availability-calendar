import AcuRNT from "./acumatica/AcuRNT";
import Static from "./static"
let apiInterFace = null
switch (process.env.NODE_ENV) {
	case "production":
		apiInterFace = AcuRNT
		break;
	default:
		apiInterFace = Static
		break;
}
export default apiInterFace;