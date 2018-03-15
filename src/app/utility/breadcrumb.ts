export class Breadcrumb {
  url: string = null;
  label: string;
  isTranslationKey: boolean;
  isActive: boolean;

  constructor(url: string, label: string, isTranslationKey: boolean, isActive: boolean) {
    this.url = url || null;
    this.label = label;
    this.isTranslationKey = isTranslationKey;
    this.isActive = isActive;
  }
}
