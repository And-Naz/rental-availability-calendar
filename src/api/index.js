import Request from "./Request";
import AcuRNT from "./acumatica/AcuRNT";
import Static from "./static"
let exportApi = null
switch (process.env.NODE_ENV) {
	case "production":
		exportApi = AcuRNT
		break;
	default:
		exportApi = Static
		break;
}
export default new Request(exportApi);