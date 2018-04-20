export class AdminMetrics {
  usersCount: number;
  companiesCount: number;

  public static buildFromResponse(response: any): AdminMetrics {
    return new AdminMetrics(response.usersCount, response.companiesCount);
  }

  constructor(usersCount: number, companiesCount: number) {
    this.usersCount = usersCount;
    this.companiesCount = companiesCount;
  }
}
