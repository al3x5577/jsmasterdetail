import { MasterDetailMode } from "./MasterDetailModeEnum";
import { MasterDetailState } from "./MasterDetailState";

export class MasterDetail {

    // Page switch state
    private readonly state: MasterDetailState;
    
    // Load Master view
    private readonly goToMaster: () => void;

    // Load Detail view
    private readonly goToDetail: () => void;

    private readonly scrollContainerMaster: Element | null;
    private readonly scrollContainerDetail: Element | null;

    private readonly detailContentContainer: Element | null;

   
    /**
     * 
     * @param goToMaster function that sets up the view to show what should be shown in master view
     * @param goToDetail function that sets up the view to show what should be shown in detaul view
     * @param backButton detail view back button. Triggers browser back event. If you want the back event pushed 
     * to the navigation stack call toMaster() on button click
     * @param detailContentContainer the detail content will be placed in this element
     * @param scrollContainerMaster if you want to restore the scroll position of the master view provide the element that has the scroll view
     * @param scrollContainerDetail if you want to restore the scroll position of the detail view provide the element that has the scroll view
     */
    constructor(goToMaster: () => void, goToDetail: () => void, backButton: Element | null = null, detailContentContainer: Element | null = null,
            scrollContainerMaster: Element | null = null, scrollContainerDetail: Element | null = null) {

        this.goToMaster = goToMaster;
        this.goToDetail = goToDetail;
        this.scrollContainerMaster = scrollContainerMaster;
        this.scrollContainerDetail = scrollContainerDetail;
        this.detailContentContainer = detailContentContainer;

        this.state = new MasterDetailState();

        // Initial history push
        history.pushState(this.state, '');

        
        // Back button
        if (backButton) {
            backButton.addEventListener('click', () => {
                history.back();
            });
        }

        // Listen for page switches
        addEventListener('popstate', (event) => {
            switch (event.state.mode) {
                case MasterDetailMode.master:
                    if (scrollContainerDetail)
                        this.state.scrollPositionDetail = scrollContainerDetail.scrollTop;
                    this.toMaster(this.state.scrollPositionDetail, false);
                    break;
                case MasterDetailMode.detail:
                    if (scrollContainerMaster)
                        this.state.scrollPositionMaster = scrollContainerMaster.scrollTop;
                    this.toDetail(this.state.content, this.state.scrollPositionDetail, false);
                    break
                default:
                    throw new Error('MasterDetailMode state unkown: ' + event.state.mode);
            }
        });

    }

    /**
     * Go to detail view
     */
    public toDetail(content?: string, scroll?: number, pushState: boolean = true) {
        // Check if view is already in detail view
        if (this.state.mode == MasterDetailMode.detail)
            return;

        // Place content if neccessary
        if (content && this.detailContentContainer)
            this.detailContentContainer.innerHTML = content;

        this.goToDetail();

        // Scroll into position if neccessary
        if (scroll && this.scrollContainerDetail) {
            console.log('Scroll to: ' + scroll);
            this.scrollContainerDetail.scrollTo(0, scroll);
        }

        // Update state
        this.state.mode = MasterDetailMode.detail;
        this.state.content = content;

        // Push site change
        if (pushState)
            history.pushState(this.state, '');
    }

    /**
     * Go to master view
     */
    public toMaster(scroll?: number, pushState: boolean = true) {
        // Check if view is already in master view
        if (this.state.mode == MasterDetailMode.master)
            return;

        this.goToMaster();

        // Scroll into position if neccessary
        if (scroll && this.scrollContainerMaster) {
            console.log('Scroll to: ' + scroll);
            this.scrollContainerMaster.scrollTo(0, scroll);
        }

        // Update state
        this.state.mode = MasterDetailMode.master;

        // Push site change
        if (pushState)
            history.pushState(this.state, '');
    }
}
