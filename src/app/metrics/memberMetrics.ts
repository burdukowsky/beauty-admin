export class MemberMetrics {
  companiesCount: number;

  public static buildFromResponse(response: any): MemberMetrics {
    return new MemberMetrics(response.companiesCount);
  }

  constructor(companiesCount: number) {
    this.companiesCount = companiesCount;
  }
}
