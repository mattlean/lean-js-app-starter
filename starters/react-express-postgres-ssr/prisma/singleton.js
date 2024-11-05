import { mockDeep, mockReset } from "jest-mock-extended";

import { prisma } from "../src/backend/prisma";

jest.mock("../src/backend/prisma", () => ({
  __esModule: true,
  prisma: mockDeep(),
}));

export const prismaMock = prisma;

beforeEach(() => mockReset(prismaMock));
