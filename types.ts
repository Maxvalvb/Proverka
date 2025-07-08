
export enum Severity {
  Critical = 'Критический',
  High = 'Высокий',
  Medium = 'Средний',
  Low = 'Низкий',
}

export enum Status {
  New = 'Новый',
  Review = 'В обработке',
  Resolved = 'Решено',
  FalsePositive = 'Ложное срабатывание',
}

export enum Category {
  Fraud = 'Мошенничество',
  Error = 'Ошибка',
  PolicyViolation = 'Нарушение политики',
  UnusualActivity = 'Необычная активность',
}

export interface Anomaly {
  id: string;
  date: string;
  severity: Severity;
  category: Category;
  description: string;
  status: Status;
  relatedDocs: string[];
  assignee?: string;
}

export interface User {
    name: string;
    role: string;
    email: string;
}

export enum View {
  Dashboard,
  Anomalies,
  Rules,
  Settings,
}