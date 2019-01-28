
import CanvasComponent from '../canvasComponent'

export default class BrickBoxComponent extends CanvasComponent {

	/* @pallete = 'OW' (USED IN OVERWORLD LEVELS) */
	/* @pallete = 'UG' (USED IN UNDERGROUND LEVELS) */
	/* @pallete = 'CASTLE' (USED IN CASTLE LEVELS) */
	/* @pallete = 'UW' (USED IN UNDERWATER LEVELS) */
	constructor(posx = 0, posy = 0, pallete = 'OW') {

		const [W, H, SPRITE, SX, SY, SW, SH] = [32, 32, CanvasComponent.SPRITES.BLOCKS]
		
		const [OW, UG, CASTLE, UW] = ['OW', 'UG', 'CASTLE', 'UW'] 

		const OWPALLETE = [[80 + 16 * 12, 112 + 16 * 0, 16, 16]] // 16 * 5 
		const UGPALLETE = [[80 + 16 * 12, 112 + 16 * 1, 16, 16]] // 16 * 6
		const CASTLEPALLETE = []
		const UWPALLETE = []
		
		const [DURATION, AMPLITUDE] = [150, H / 2]

		let PALLETE;
		if (pallete == OW) PALLETE = OWPALLETE
		else if (pallete == UG) PALLETE = UGPALLETE
		else if (pallete == CASTLE) PALLETE = CASTLEPALLETE 
		else if (pallete == UW) PALLETE = UWPALLETE
		
		super(W, H, SPRITE, posx, posy, 'sprite', PALLETE[0][0], PALLETE[0][1], PALLETE[0][2], PALLETE[0][3])
		this.pallete = PALLETE
		this.animationParameters = {DURATION, AMPLITUDE}
	}

	animate(time, scene) {
		
		if (!this.animationInitialized) {
			this.animationInitialized = true
			this.inittime = time
			this.initposy = this.posy
		}

		const {DURATION, AMPLITUDE} = this.animationParameters
		let ANIMATIONCOMPLETED = false
		let durationIndex = (time - this.inittime) / DURATION
		
		if (durationIndex >= 1) ANIMATIONCOMPLETED = true
		
		if (ANIMATIONCOMPLETED) {
			this.posy = this.initposy
			this.animationInitialized = this.inittime = this.initposy = undefined
			return true
		}
		else this.posy = this.initposy - AMPLITUDE * Math.sin(Math.PI * durationIndex)
	}

	hit(scene) { scene.bindComponentForAnimation(this.componentIdentifier) }

} 