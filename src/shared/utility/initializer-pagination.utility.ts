export class PaginationInitializer {
    public readonly allowedPageSizes = [5, 10, 'all'];
    public readonly displayModes = [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }];
    public displayMode = 'compact';
    public showPageSizeSelector = true;
    public showInfo = true;
  constructor() {}
}
