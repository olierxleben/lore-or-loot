import type {FunctionalComponent} from "preact";
import { useState, useCallback } from "preact/hooks";

interface Props {

    stock: {
        name: string,
        price: number,
        amount: number
    }[]
}


export const Shop: FunctionalComponent<Props> = props => {

    const [ coins, setCoins ] = useState(10);
    const [ stock, setStock ] = useState<{[index: number]: number}>(
                                    props.stock.reduce(
                                        (acc, item, index) => ({...acc, [index]: item.amount}), {}));

    const handleBuy = useCallback((index: number) => {
        const item = props.stock[index];

        setCoins(coins => coins - item.price);
        setStock(stock => ({...stock, [index]: stock[index] - 1}));

    }, [ setCoins, setStock ]);


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
                                disabled={ stock[index] <= 0 || item.price > coins }
                                onClick={ () => { handleBuy(index); } }
                            >
                                Buy
                            </button>
                        </td>
                    </tr>
                ) }
            </tbody>
        </table>
        <p>You have { coins }🪙 left</p>
    </>;
}