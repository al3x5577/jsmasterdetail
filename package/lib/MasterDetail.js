import { MasterDetailMode } from "./MasterDetailModeEnum";
import { MasterDetailState } from "./MasterDetailState";
var MasterDetail = /** @class */ (function () {
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
    function MasterDetail(goToMaster, goToDetail, backButton, detailContentContainer, scrollContainerMaster, scrollContainerDetail) {
        if (backButton === void 0) { backButton = null; }
        if (detailContentContainer === void 0) { detailContentContainer = null; }
        if (scrollContainerMaster === void 0) { scrollContainerMaster = null; }
        if (scrollContainerDetail === void 0) { scrollContainerDetail = null; }
        var _this = this;
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
            backButton.addEventListener('click', function () {
                history.back();
            });
        }
        // Listen for page switches
        addEventListener('popstate', function (event) {
            console.log('pop');
            switch (event.state.mode) {
                case MasterDetailMode.master:
                    if (scrollContainerDetail)
                        _this.state.scrollPositionDetail = scrollContainerDetail.scrollTop;
                    _this.toMaster(_this.state.scrollPositionDetail, false);
                    break;
                case MasterDetailMode.detail:
                    if (scrollContainerMaster)
                        _this.state.scrollPositionMaster = scrollContainerMaster.scrollTop;
                    _this.toDetail(_this.state.content, _this.state.scrollPositionDetail, false);
                    break;
                default:
                    throw new Error('MasterDetailMode state unkown: ' + event.state.mode);
            }
        });
    }
    /**
     * Go to detail view
     */
    MasterDetail.prototype.toDetail = function (content, scroll, pushState) {
        if (pushState === void 0) { pushState = true; }
        // Check if view is already in detail view
        if (this.state.mode == MasterDetailMode.detail)
            return;
        // Set content
        this.state.content = content;
        this.goToDetail();
        // Scroll into position if neccessary
        if (scroll && this.scrollContainerDetail) {
            console.log('Scroll to: ' + scroll);
            this.scrollContainerDetail.scrollTo(0, scroll);
        }
        // Place content if neccessary
        if (content && this.detailContentContainer)
            this.detailContentContainer.innerHTML = content;
        // Update state
        this.state.mode = MasterDetailMode.detail;
        // Push site change
        if (pushState)
            history.pushState(this.state, '');
    };
    /**
     * Go to master view
     */
    MasterDetail.prototype.toMaster = function (scroll, pushState) {
        if (pushState === void 0) { pushState = true; }
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
    };
    return MasterDetail;
}());
export { MasterDetail };
