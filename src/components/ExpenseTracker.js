import React from 'react'
import { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';

export default function ExpenseTracker() {
    let [expense, setExpense] = useState([])
    let [budget, setBudget] = useState(0)
    let balance = 0;
    let totalAmount = 0;
    const [isSubmitted, setisSubmitted] = useState(false);
    let index = 0;
    var date = new Date();
    // let [date, setDate] =useState[ ];



    let saveBudget = (e) => {
        e.preventDefault();
        let urBudget = e.target.amount.value;
        // let budget = urBudget;
        setBudget(urBudget)
        setisSubmitted(true)

    }


    let saveItem = (e) => {
        e.preventDefault();

        let itemName = e.target.item.value;
        let itemPrice = +e.target.price.value;
        if (expense.find(item => item.itemName == itemName)) {
            alert('items already exit , Do You want to add it again, Yes')
        } else {

            let objTask = {
                itemName,
                itemPrice,
            }

            expense.push(objTask)
            // console.log(expense)
            setExpense([...expense])
        }
        e.target.item.value = "";
        e.target.price.value = "";
    }

    let listOfExpense = expense.map((element, ind) => {

        totalAmount += element.itemPrice;
        console.log(totalAmount)

        if (ind === 0) {
            balance = budget - element.itemPrice;
        } else {
            balance = balance - element.itemPrice;

        }
        return (
            <ItemName {...element} budget={budget} indexNum={ind} balance={balance} key={ind} totalAmount={totalAmount} />
        )
    })

    console.log('list of Expense' + listOfExpense)

    return (
        <div className="App">

            <h4 className='mt-5'>{date.toDateString()}</h4>
            <h1> Expense Tracker </h1> <h3> ur Budget :   {budget}</h3>
            <Form onSubmit={saveBudget}>
                {!isSubmitted && <div className="d-flex justify-content-center">
                    <div className='d-flex  w-30 gap-3 mt-5'>
                        <Form.Control className='mr-2 w-40' name='amount' type="text" placeholder="Budget Amount" />
                        <button className='btn btn-dark ml-2'> Add </button>
                    </div>
                </div>}
            </Form>

            {isSubmitted && <div className={`${isSubmitted ? '' : 'hide'}`}>
                <form className='itemform' onSubmit={saveItem}>

                    <div className='d-flex justify-content-around mb-5 mt-5'>
                        <div className='d-flex justify-content-around gap-5 w-50'>
                            <Form.Control className='mr-2' name='item' type="text" placeholder="item" />
                            <Form.Control className='mr-2' name='price' type="text" placeholder="price" />
                            <button className='btn btn-dark'>save</button>

                        </div>
                    </div>
                </form>

                <div className='outerDiv'>
                    <Table className='' striped bordered hover>
                        <thead>
                            <tr className='fWeight'>
                                <td> Serial # </td>
                                <td>Item Name </td>
                                <td>Item Price </td>
                                <td> Current Balance</td>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfExpense}
                        </tbody>

                        <tfoot className={`${!expense[index] == 0 ? '' : 'hide'}`}>
                            <tr>
                                <td></td>
                                <td>Total Expense :</td>
                                <td>{totalAmount}</td>
                                <td></td>

                            </tr>
                        </tfoot>
                    </Table>
                </div>
            </div>}


        </div>
    );
}


function ItemName({ itemName, itemPrice, indexNum, balance, totalAmount }) {
    return (
        <>
            {/* <li> {itemName} : {itemPrice} : {budget - itemPrice} </li> */}
            <tr>

                <td>{indexNum + 1}</td>
                <td>{itemName}</td>
                <td>{itemPrice}</td>
                <td>{balance}</td>

            </tr>
        </>
    )
}
