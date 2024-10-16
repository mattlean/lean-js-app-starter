export interface Props {
    filePath?: string
}

/**
 * React button component that opens the folder the currently opened file is located in.
 */
export default function ShowInFolderBtn({ filePath }: Props) {
    return (
        <button
            disabled={!filePath}
            className="btn"
            onClick={() => window.api.showInFolder()}
        >
            Show In Folder
        </button>
    )
}
