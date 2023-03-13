
import { _decorator, Component, Node, EditBox, Label, UIOpacity, tween, Vec3 } from 'cc';
import { APIHandler, PoseResult } from './APIHelper';
const { ccclass, property } = _decorator;

@ccclass('UILoginForm')
export class UILoginForm extends Component implements APIHandler {

	@property(Node)
	UI: Node = null

	@property(Node)
	cloak: Node = null

	@property(EditBox)
	username: EditBox = null

	@property(EditBox)
	password: EditBox = null

	@property(Label)
	action_result: Label = null

	showUI() {
		this.UI.active = true
		this.cloak.active = true
		this.cloak.getComponent(UIOpacity).opacity = 0
		tween(this.UI).to(0.2, { scale: new Vec3(1, 1, 1) }, { easing: 'quadOut' }).start()
		tween(this.cloak.getComponent(UIOpacity)).to(0.1, { opacity: 255 }).start()
	}

	hideUI() {
		tween(this.UI).to(0.2, { scale: new Vec3(1, 0, 0) }, { easing: 'quadIn' })
			.call(() => {
				this.UI.active = false
			}).start()
		tween(this.cloak.getComponent(UIOpacity)).to(0.1, { opacity: 0 })
			.call(() => {
				this.cloak.active = false
			}).start()
	}

	register() {
		
	}

	login() {

	}

	onRegister(message: string) {

	}

	onLogin(message: string) {

	}

	onPoseResult(poseResult: PoseResult) {

	}


}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
