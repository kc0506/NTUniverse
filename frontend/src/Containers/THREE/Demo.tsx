import Main from './Main';
import TruckArea from './areas/TruckArea';
import Ground from './Ground';
import ShedArea from './areas/shed/ShedArea';
import HouseArea from './areas/house/HouseArea';
import Markets from './areas/Markets';
import { useControls } from 'leva';

const modelBase = './resources/SFu/models';
const textureBase = './resources/SFu/textures';

export default function SFu() {

	return (
		<group position={[0, -2.05, 0]}>
			<Ground />
			<Main />
			<HouseArea />
			<ShedArea />
			<TruckArea />
			<Markets />
		</group >
	)
}

export { modelBase, textureBase };