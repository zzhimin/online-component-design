declare module "@app/core/css/css" {
  class Cssjs {
    testMode: boolean;
    cssPreviewNamespace: string;
    createStyleElement: (namespace: string, customCss: string, nonamespace: string) => void;
  }
  export = Cssjs;
}