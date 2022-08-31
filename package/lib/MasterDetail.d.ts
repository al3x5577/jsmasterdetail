export declare class MasterDetail {
    private readonly state;
    private readonly goToMaster;
    private readonly goToDetail;
    private readonly scrollContainerMaster;
    private readonly scrollContainerDetail;
    private readonly detailContentContainer;
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
    constructor(goToMaster: () => void, goToDetail: () => void, backButton?: Element | null, detailContentContainer?: Element | null, scrollContainerMaster?: Element | null, scrollContainerDetail?: Element | null);
    /**
     * Go to detail view
     */
    toDetail(content?: string, scroll?: number, pushState?: boolean): void;
    /**
     * Go to master view
     */
    toMaster(scroll?: number, pushState?: boolean): void;
}
