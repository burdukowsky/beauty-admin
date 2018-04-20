export class AdminMetrics {
  usersCount: number;
  companiesCount: number;

  constructor(usersCount: number, companiesCount: number) {
    this.usersCount = usersCount;
    this.companiesCount = companiesCount;
  }
}
