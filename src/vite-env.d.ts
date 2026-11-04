/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORM_ENDPOINT?: string;
  readonly VITE_OWNER_INBOX?: string;
  readonly VITE_ENABLE_ILLUSTRATIVE_COMPARISON?: string;
  readonly VITE_ENABLE_PRODUCTION_INDEXING?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

