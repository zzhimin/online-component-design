export interface Settings {
  name?: string;
}
export interface Widget {
  id: string | number;
  createTime: string | number;
  htmlTemplate: string;
  cssTemplate: string;
  javascriptTemplate: string;
  settings: string;
  [key: string]: any;
}