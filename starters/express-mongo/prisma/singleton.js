import { mockDeep, mockReset } from "jest-mock-extended";

import { prisma } from "../src/prisma";

jest.mock("../src/prisma", () => ({
  __esModule: true,
  prisma: mockDeep(),
}));

export const prismaMock = prisma;

beforeEach(() => mockReset(prismaMock));
