/// <reference types="vite/src" />

declare module "*.svg" {
  const content: string;
  export default content;
}
