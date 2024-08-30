import { useForm, SubmitHandler } from "react-hook-form";


export default function NewEntryForm() {
    interface NewRecordModal {
        stock_name: string,
        transaction_type: string,
        date: Date,
        price: number,
        quantity: number,
        amount: number
    }

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<NewRecordModal>()

    const onSubmit:SubmitHandler<NewRecordModal> = async (data:NewRecordModal) => {
        console.log(data);
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}className="row g-3 d-flex justify-content-center my-4">
                <div className="col-md-4">
                    <label htmlFor="Stockname" className="form-label">Stock name</label>
                    <input {...register("stock_name", { required: true})} className={`form-control ${errors.stock_name ? 'is-invalid':''}` }list="datalistOptions" id="Stockname" placeholder="Type to search..."/>
                    <datalist id="datalistOptions">
                        <option value="San Francisco"/>
                        <option value="New York"/>
                        <option value="Seattle"/>
                        <option value="Los Angeles"/>
                        <option value="Chicago"/>
                    </datalist>
                </div>

                <div className="col-md-4">
                    <label htmlFor="transactionType" className="form-label">Type</label>
                    <select id="transactionType" value='buy' className="form-select">
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label htmlFor="transactionDate" className="form-label">Date</label>
                    <input type="date" className="form-control" id="transactionDate" />
                </div>
                <div className="col-md-2">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" step="0.01" id="price" />
                </div>
                
                <div className="col-md-2">
                    <label htmlFor="quanity" className="form-label">Quanity</label>
                    <input type="number" className="form-control" step="1" id="quanity" />
                </div>

                <div className="col-md-2">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" className="form-control" step="1" id="amount" />
                </div>
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
}
