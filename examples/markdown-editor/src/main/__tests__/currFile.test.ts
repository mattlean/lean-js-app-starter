/**
 * @jest-environment node
 */
import {
  MOCK_BARBAZ_FILE_CONTENT,
  MOCK_BARBAZ_FILE_PATH,
  MOCK_FOOBAR_FILE_CONTENT,
  MOCK_FOOBAR_FILE_PATH,
} from "../../common/MOCK_DATA";
import {
  isCurrFileChanged,
  isFileOpen,
  resetCurrFile,
  setCurrFile,
  setupCurrFile,
} from "../currFile";

jest.mock("electron", () => ({
  __esModule: true,
  app: { addRecentDocument: jest.fn() },
}));

setupCurrFile();

afterEach(() => resetCurrFile());

test("currFile defaults to no files opened", () => {
  expect(isFileOpen()).toBe(false);
});

test("currFile defaults markdownSaved to empty string", () => {
  expect(isCurrFileChanged("")).toBe(false);
});

test("currFile is set to the opened file through setCurrFile", () => {
  // Expect currFile to start with no file opened
  expect(isFileOpen()).toBe(false);
  expect(isCurrFileChanged("")).toBe(false);

  // Set currFile to foobar.md
  setCurrFile(MOCK_FOOBAR_FILE_PATH, MOCK_FOOBAR_FILE_CONTENT);

  // Expect currFile to be set to foobar.md
  expect(isFileOpen()).toBe(MOCK_FOOBAR_FILE_PATH);
  expect(isCurrFileChanged(MOCK_FOOBAR_FILE_CONTENT)).toBe(false);
});

test("currFile changes to a different file while a file is currently open", () => {
  // Expect currFile to start with no file opened
  expect(isFileOpen()).toBe(false);
  expect(isCurrFileChanged("")).toBe(false);

  // Set currFile to foobar.md
  setCurrFile(MOCK_FOOBAR_FILE_PATH, MOCK_FOOBAR_FILE_CONTENT);

  // Expect currFile to be set to foobar.md
  expect(isFileOpen()).toBe(MOCK_FOOBAR_FILE_PATH);
  expect(isCurrFileChanged(MOCK_FOOBAR_FILE_CONTENT)).toBe(false);

  // Set currFile to barbaz.md
  setCurrFile(MOCK_BARBAZ_FILE_PATH, MOCK_BARBAZ_FILE_CONTENT);

  // Expect currFile to be set to barbaz.md
  expect(isFileOpen()).toBe(MOCK_BARBAZ_FILE_PATH);
  expect(isCurrFileChanged(MOCK_BARBAZ_FILE_CONTENT)).toBe(false);
});

test("currFile resets to no files opened through resetCurrFile", () => {
  // Expect currFile to start with no file opened
  expect(isFileOpen()).toBe(false);
  expect(isCurrFileChanged("")).toBe(false);

  // Set currFile to foobar.md
  setCurrFile(MOCK_FOOBAR_FILE_PATH, MOCK_FOOBAR_FILE_CONTENT);

  // Expect currFile to be set to foobar.md
  expect(isFileOpen()).toBe(MOCK_FOOBAR_FILE_PATH);
  expect(isCurrFileChanged(MOCK_FOOBAR_FILE_CONTENT)).toBe(false);

  // "Close" current file
  resetCurrFile();

  // Expect currFile to return to no file opened
  expect(isFileOpen()).toBe(false);
  expect(isCurrFileChanged("")).toBe(false);
});
