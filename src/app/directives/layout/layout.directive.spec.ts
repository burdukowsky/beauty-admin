import {
  SidebarToggleDirective,
  SidebarMinimizeDirective,
  BrandMinimizeDirective,
  MobileSidebarToggleDirective,
  AsideToggleDirective
} from './layout.directive';

describe('LayoutDirective', () => {
  it('should create an instance', () => {
    const sidebarToggleDirective = new SidebarToggleDirective();
    expect(sidebarToggleDirective).toBeTruthy();

    const sidebarMinimizeDirective = new SidebarMinimizeDirective();
    expect(sidebarMinimizeDirective).toBeTruthy();

    const brandMinimizeDirective = new BrandMinimizeDirective();
    expect(brandMinimizeDirective).toBeTruthy();

    const mobileSidebarToggleDirective = new MobileSidebarToggleDirective();
    expect(mobileSidebarToggleDirective).toBeTruthy();

    const asideToggleDirective = new AsideToggleDirective();
    expect(asideToggleDirective).toBeTruthy();
  });
});
