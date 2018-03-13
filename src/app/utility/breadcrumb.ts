export class Breadcrumb {
  url: string;
  label: string;
  isTranslationKey: boolean;

  constructor(url: string, label: string, isTranslationKey: boolean) {
    this.url = url;
    this.label = label;
    this.isTranslationKey = isTranslationKey;
  }
}
