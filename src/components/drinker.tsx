import type {FunctionalComponent} from "preact";


export const Drinker: FunctionalComponent<{barkeeper: string}> = ({barkeeper}) => {

    const handleTake = () => {
        console.log('yay')
        alert('yay')
    }

    const handleDismiss = () => {
        console.log('dismiss')
        alert('nay')
    }

    return (
        <>
            <p>You see a beautiful barkeeper, her name is {barkeeper}. She offers you a beer...</p>
            <div>
                <button className="p-2 m-1 bg-amber-600" onClick={handleTake}>I take it</button>
                <button className="p-2 m-1 bg-blue-600" onClick={handleDismiss}>No!</button>
            </div>
        </>
    )
}