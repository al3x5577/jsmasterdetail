import {MasterDetailMode} from "./MasterDetailModeEnum";

export class MasterDetailState {

    public mode: MasterDetailMode;
    public overviewClickEventActive: boolean
    public content?: string;
    public scrollPositionMaster?: number;
    public scrollPositionDetail?: number;

    constructor() {
        this.mode = MasterDetailMode.master;
        this.overviewClickEventActive = true;
    }

}