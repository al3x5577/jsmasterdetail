import { MasterDetailMode } from "./MasterDetailModeEnum";
export declare class MasterDetailState {
    mode: MasterDetailMode;
    overviewClickEventActive: boolean;
    content?: string;
    scrollPositionMaster?: number;
    scrollPositionDetail?: number;
    constructor();
}
