import { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0)
    const [forceCountInput, setForceCountInput] = useState<number | ''>('')

    return (
        <div className="align-items-center container d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header">Counting App</div>
                <div className="card-body d-flex flex-column align-items-center px-5">
                    <p className="lead">Count is currently...</p>
                    <p className="display-1">{count}</p>
                    <div className="w-100">
                        <button
                            type="button"
                            onClick={() => setCount(count - 1)}
                            className="btn btn-success w-50"
                            style={{ height: 50 }}
                        >
                            -
                        </button>
                        <button
                            type="button"
                            onClick={() => setCount(count + 1)}
                            className="btn btn-success w-50"
                            style={{ height: 50 }}
                        >
                            +
                        </button>
                    </div>
                    <hr className="w-100" />
                    <div className="input-group">
                        <input
                            type="number"
                            value={forceCountInput}
                            onChange={(e) => {
                                setForceCountInput(e.target.valueAsNumber)
                            }}
                            placeholder="Force count to be..."
                            className="form-control"
                        />
                        <button
                            type="button"
                            disabled={typeof forceCountInput !== 'number'}
                            onClick={() => {
                                if (typeof forceCountInput === 'number') {
                                    setCount(forceCountInput)
                                }
                            }}
                            className="btn btn-danger"
                        >
                            Force!
                        </button>
                    </div>
                    <hr className="w-100" />
                    <button
                        type="button"
                        onClick={() => setCount(0)}
                        className="btn btn-primary w-100"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}
