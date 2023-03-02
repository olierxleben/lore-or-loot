import type {FunctionalComponent} from "preact";
import { useState, useCallback } from "preact/hooks";

interface Props {

}


export const Fight: FunctionalComponent<Props> = props => {

    const [ playerHp, setPlayerHp ] = useState(10);
    const [ enemyHp, setEnemyHp ] = useState(10);

    const [ logs, setLogs ] = useState<string[]>([]);

    const handleAttack = useCallback(() => {

        console.log("handle Attack");

        if (Math.random() < 0.7) {
            setLogs(logs => [...logs, 'You hit the enemy']);
            setEnemyHp(hp => hp - 1);
        } 
        else {
            setLogs(logs => [...logs, 'You miss']);
        }

        if (Math.random() < 0.5) {
            setLogs(logs => [...logs, 'The enemy hits you!']);
            setPlayerHp(hp => hp - 1);
        }
        else {
            setLogs(logs => [...logs, 'The enemy misses!']);
        }

    }, [ setPlayerHp, setEnemyHp ]);

    if (playerHp <= 0) {
        return <p>You Died!</p>
    }

    if (enemyHp <= 0) {
        return <p>You won!</p>
    }

    return (
        <div className="p-2 m-1">
            <ul>
                { logs.map((entry, index) =>
                    <li key={ index }>{ entry }</li>
                )}
            </ul>

            <p>Your life is at { playerHp }🧡</p>
            <p>Your enemy's life is at { enemyHp }🧡</p>

            <button
                className="p-2 m-1 bg-red-300"
                onClick={ handleAttack }
            >
                Attack
            </button>
        </div>
    )
}