
import { _decorator, Component, Node, EditBox, Label, UIOpacity, tween, Vec3, Color } from 'cc';
import { APIHandler, APIHelper, DetectPoseResponse, GetAllResultsResponse, LoginResponse, RegisterResponse } from './APIHelper';
import { LevelData } from './data';
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

  api: APIHelper = new APIHelper(this)

  @property(Node)
  button_login: Node = null

  @property(Label)
  username_label: Label = null

  @property(Node)
  username_node: Node = null

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
    this.api.register(
      this.username.string,
      this.password.string
    )
  }

  login() {
    this.api.login(
      this.username.string,
      this.password.string
    )
  }

  setActionResult(isSuccess: boolean, str: string) {
    this.action_result.color = isSuccess ? new Color(0, 255, 0) : new Color(255, 0, 255)
    this.action_result.string = str
    this.scheduleOnce(() => {
      this.action_result.string = ''
    }, 3)
  }

  getAllResults() {

  }

  onDetectPose(response: DetectPoseResponse) {

  }

  onRegister(response: RegisterResponse) {
    console.log(response)
    this.setActionResult(!!response.success, response.message)
  }

  onLogin(response: LoginResponse) {
    console.log(response)
    this.setActionResult(!!response.success, response.message || '')
    if (response.success) {
      const user_data = response.data
      LevelData.user_data = user_data
      console.log(user_data, user_data.username)
      this.username_node.active = true
      this.button_login.active = false
      this.username_label.string = user_data.username
      this.username.string = ''
      this.password.string = ''

      this.api.getAllResults(user_data._id)

      this.hideUI()
      
    }
  }

  onGetAllResults(response: GetAllResultsResponse) {
    console.log(response)
    for (const result of response.data) {
      const level = LevelData.levels.find(level => level._id === result.level_id)
      level.score = result.score
      level.percent = result.percent
    }
  }

  logout() {
    LevelData.user_data = null
    this.username_node.active = false
    this.button_login.active = true
    for (const level of LevelData.levels) {
      level.score = 0
      level.percent = 0
    }
    console.log(LevelData.levels)
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
