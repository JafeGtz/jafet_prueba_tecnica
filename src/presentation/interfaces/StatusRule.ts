export interface StatusRule<TSnapshot, TStatus> {
  status: TStatus;
  when(snapshot: TSnapshot): boolean;
}
