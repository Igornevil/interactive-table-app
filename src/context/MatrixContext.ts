import { createContext } from "react";
import type { MatrixContextType } from "./types";

export const MatrixContext = createContext<MatrixContextType>(
  {} as MatrixContextType
);
