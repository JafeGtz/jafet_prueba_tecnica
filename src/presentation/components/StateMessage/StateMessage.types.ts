export interface StateMessageProps {
  title: string;
  message: string;
  actionLabel: string;
  onAction(): void;
}
