import type {FunctionalComponent} from "preact";
import { useState, useCallback } from "preact/hooks";
import { addInventoryItem, substractWealth, wealth } from '../engine/Inventory'
import { useStore } from '@nanostores/preact';

interface Props {
    stock: {
        name: string,
        price: number,
        amount: number
    }[]
}


export const Shop: FunctionalComponent<Props> = props => {
    
    const $wealth = useStore(wealth);
    //const [ coins, setCoins ] = useState(wealth);
    const [ stock, setStock ] = useState<{[index: number]: number}>(
                                    props.stock.reduce(
                                        (acc, item, index) => ({...acc, [index]: item.amount}), {}));

    const handleBuy = useCallback((index: number) => {
        const item = props.stock[index];

        // const coinsLeft = subWealth({id: "coins", quantity: item.price })
        // console.log('coinsLeft', coinsLeft)
        substractWealth({id: "coins", quantity: item.price});
        setStock(stock => ({...stock, [index]: stock[index] - 1}));
        addInventoryItem({id: item.name, name: item.name});
    }, [ setStock ]);


    return <>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                { props.stock.map((item, index) => 
                    <tr key={ index }>
                        <td>{ item.name }</td>
                        <td>{ item.price }🪙</td>
                        <td>{ stock[index] }</td>
                        <td>
                            <button
                                className="bg-amber-600 p-1"
                                disabled={ stock[index] <= 0 || item.price > $wealth["coins"].quantity }
                                onClick={ () => { handleBuy(index); } }
                            >
                                Buy
                            </button>
                        </td>
                    </tr>
                ) }
            </tbody>
        </table>
        <p>You have { $wealth["coins"].quantity }🪙 left</p>
    </>;
}