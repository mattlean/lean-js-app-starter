import './index.scss'

/**
 * Counter class responsible for managing the state and rendering the counter UI.
 */
export default class Counter {
    /** Current counter state. */
    private _count = 0

    /** Reference to the count text paragraph element. */
    private _countText?: HTMLDivElement

    /**
     * Create a new instance of the Counter class.
     * @param startCount Number the counter should start at
     */
    constructor(startCount = 0) {
        this._count = startCount
    }

    /**
     * Create the counter element.
     * @param startCount Number the counter should start at
     * @returns The div element containing the counter elements
     */
    create(startCount = 0) {
        const counter = document.createElement('div')
        counter.setAttribute(
            'class',
            'align-items-center container d-flex justify-content-center h-100',
        )

        const card = document.createElement('div')
        card.setAttribute('class', 'card')
        counter.appendChild(card)

        const cardHeader = document.createElement('div')
        cardHeader.setAttribute('class', 'card-header')
        cardHeader.appendChild(document.createTextNode('Counting App'))
        card.appendChild(cardHeader)

        const cardBody = document.createElement('div')
        cardBody.setAttribute(
            'class',
            'card-body d-flex flex-column align-items-center px-5',
        )
        card.appendChild(cardBody)

        const counterText = document.createElement('p')
        counterText.setAttribute('class', 'lead')
        counterText.appendChild(
            document.createTextNode('Count is currently...'),
        )
        cardBody.appendChild(counterText)

        const countText = document.createElement('p')
        countText.setAttribute('class', 'display-1')
        this._countText = countText
        this.setCount(startCount)
        cardBody.appendChild(countText)

        const btnsDiv = document.createElement('div')
        btnsDiv.setAttribute('class', 'column-gap-3 d-flex w-100')
        cardBody.appendChild(btnsDiv)

        const btnDecrement = document.createElement('button')
        btnDecrement.setAttribute('class', 'btn btn-success w-50')
        const iconDecrement = document.createElement('i')
        iconDecrement.setAttribute('class', 'bi bi-dash-circle')
        iconDecrement.setAttribute('style', 'font-size: 1.5rem;')
        const iconDecrementText = document.createElement('span')
        iconDecrementText.setAttribute('class', 'sr-only')
        iconDecrementText.appendChild(
            document.createTextNode('Decrement Count'),
        )
        iconDecrement.appendChild(iconDecrementText)
        btnDecrement.appendChild(iconDecrement)
        btnDecrement.addEventListener('click', () => {
            this.setCount(this._count - 1)
        })
        btnsDiv.appendChild(btnDecrement)

        const btnIncrement = document.createElement('button')
        btnIncrement.setAttribute('class', 'btn btn-success w-50')
        const iconIncrement = document.createElement('i')
        iconIncrement.setAttribute('class', 'bi bi-plus-circle-fill')
        iconIncrement.setAttribute('style', 'font-size: 1.5rem;')
        const iconIncrementText = document.createElement('span')
        iconIncrementText.setAttribute('class', 'sr-only')
        iconIncrementText.appendChild(
            document.createTextNode('Increment Count'),
        )
        iconIncrement.appendChild(iconIncrementText)
        btnIncrement.appendChild(iconIncrement)
        btnIncrement.addEventListener('click', () => {
            this.setCount(this._count + 1)
        })
        btnsDiv.appendChild(btnIncrement)

        const horizontalRuleA = document.createElement('hr')
        horizontalRuleA.setAttribute('class', 'w-100')
        cardBody.appendChild(horizontalRuleA)

        const inputGroup = document.createElement('div')
        inputGroup.setAttribute('class', 'input-group')
        cardBody.appendChild(inputGroup)

        const inputForceCount = document.createElement('input')
        inputForceCount.setAttribute('type', 'number')
        inputForceCount.setAttribute('placeholder', 'Force count to be...')
        inputForceCount.setAttribute('class', 'form-control')
        inputGroup.appendChild(inputForceCount)

        const btnForceCount = document.createElement('button')
        btnForceCount.setAttribute('disabled', '')
        btnForceCount.setAttribute('class', 'btn btn-danger')
        btnForceCount.appendChild(document.createTextNode('Force!'))
        inputForceCount.addEventListener('input', (e) => {
            if (e.target) {
                // Enable or disable btnForceCount depending on value in inputForceCount
                if (
                    Number.isNaN((e.target as HTMLInputElement).valueAsNumber)
                ) {
                    btnForceCount.setAttribute('disabled', '')
                } else {
                    btnForceCount.removeAttribute('disabled')
                }
            }
        })
        btnForceCount.addEventListener('click', () => {
            if (!Number.isNaN(inputForceCount.valueAsNumber)) {
                this.setCount(inputForceCount.valueAsNumber)
            }
        })
        inputGroup.appendChild(btnForceCount)

        const horizontalRuleB = document.createElement('hr')
        horizontalRuleB.setAttribute('class', 'w-100')
        cardBody.appendChild(horizontalRuleB)

        const btnReset = document.createElement('button')
        btnReset.setAttribute('class', 'btn btn-primary w-100')
        btnReset.appendChild(document.createTextNode('Reset'))
        btnReset.addEventListener('click', () => {
            this.setCount(0)
        })
        cardBody.appendChild(btnReset)

        return counter
    }

    /**
     * Get the current count state value.
     * @returns The current count state value
     */
    getCount() {
        return this._count
    }

    /**
     * Set the count state and rerender the count text paragraph element.
     * @param newCount Number the counter should change to
     */
    setCount(newCount: number) {
        this._count = newCount

        if (this._countText) {
            // Rerender the count text if the counter is already rendered
            this._countText.textContent = this._count.toString()
        }
    }
}

/**
 * Create a new counter element and replace an element's children with it.
 * @param element Element to render the counter in
 * @param countStart Number the counter should start at
 * @returns The counter element
 */
export function createCounter(element: HTMLElement, countStart = 0) {
    const c = new Counter()
    const counterElement = c.create(countStart)
    element.replaceChildren(counterElement)
    return counterElement
}
