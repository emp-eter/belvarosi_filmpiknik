/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RAIN_ALERT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
