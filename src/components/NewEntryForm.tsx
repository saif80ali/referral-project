import { useForm, SubmitHandler } from "react-hook-form";
import { postMethod } from "../services/apiCallService";
import { useNavigate } from "react-router-dom";


export default function NewEntryForm() {
    interface NewRecordModal {
        stock_name: string,
        transaction_type: string,
        transaction_date: Date,
        price: number,
        quantity: number,
        amount: number,
    }
    const navigate = useNavigate();
    const { register, handleSubmit, getValues, setValue, getFieldState, watch, formState: { errors } } = useForm<NewRecordModal>()
    const onSubmit:SubmitHandler<NewRecordModal> = async (data:NewRecordModal) => {
        postMethod("stocks/addTransaction", data).then((response) => {
            alert("New record added");
            navigate("/dashboard");
            
        }).catch((err) => {
            alert("Some erro ocurred");
        })
    }

    function debounce(func: Function, delay: number): (...args: any[]) => void {
        let timeoutId: ReturnType<typeof setTimeout>;
        return function(this: any, ...args: any[]) {
          const context = this;
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func.apply(context, args);
          }, delay);
        };
    }

    
    const formatSingleDigit = (val: number) => {
        return Math.round(val * 10) / 10;
    }
    
    const setFinalAmout = (e: React.ChangeEvent<HTMLInputElement>, formField: keyof NewRecordModal)=> {
        let value = e.target.value;
        setValue(formField, value, {shouldTouch: true, shouldValidate: true});
        switch(formField){
            case "amount":
                if (getFieldState("quantity").isTouched && !getFieldState("quantity").invalid) {
                    let price = getValues("amount") / getValues("quantity");
                    price = formatSingleDigit(price);
                    setValue("price", price, {shouldTouch: true, shouldValidate: true});
                } else if(getFieldState("price").isTouched && !getFieldState("price").invalid) {
                    let quantity = getValues("amount") / getValues("price");
                    quantity = formatSingleDigit(quantity);
                    setValue("quantity", quantity, {shouldTouch: true, shouldValidate: true});
                }
                break;
            default:
                if (getFieldState("quantity").isTouched && getFieldState("price").isTouched) {
                    let amount = getValues("quantity") * getValues("price");
                    amount = formatSingleDigit(amount);
                    setValue("amount", amount, {shouldTouch: true, shouldValidate: true});
                } else if (getFieldState("amount").isTouched && getFieldState("price").isTouched) {
                    let quantity = getValues("amount") / getValues("price");
                    quantity = formatSingleDigit(quantity);
                    setValue("quantity", quantity, {shouldTouch: true, shouldValidate: true});
                } else if (getFieldState("amount").isTouched && getFieldState("quantity").isTouched) {
                    let price = getValues("amount") / getValues("quantity");
                    price = formatSingleDigit(price);
                    setValue("price", price, {shouldTouch: true, shouldValidate: true});
                }
                break;
        }
        
    }
    const enhanceOnchange = debounce(setFinalAmout, 300);
    const dropdownValue = watch('transaction_type');
    
    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}className="row g-3 d-flex justify-content-center my-4" noValidate>
                <div className="col-md-4">
                    <label htmlFor="transactionType" className="form-label">Type</label>
                    <select {...register("transaction_type", { required: true})} defaultValue="" id="transactionType" className={`form-select ${errors.transaction_type ? 'is-invalid':''}`}>
                        <option value="" disabled>Transaction type</option>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label htmlFor="Stockname" className="form-label">Stock name</label>
                    <input {...register("stock_name", { required: true, minLength:2})} className={`form-control ${errors.stock_name ? 'is-invalid':''}`} list="datalistOptions" id="Stockname" placeholder="Type here..." disabled={dropdownValue ? false : true} />
                    <datalist id="datalistOptions">
                        <option value="San Francisco"/>
                        <option value="New York"/>
                        <option value="Seattle"/>
                        <option value="Los Angeles"/>
                        <option value="Chicago"/>
                    </datalist>
                </div>

                <div className="col-md-4">
                    <label htmlFor="transactionDate" className="form-label">Date</label>
                    <input {...register("transaction_date", { required: true})} type="date" className={`form-control ${errors.transaction_date ? 'is-invalid':''}`} id="transactionDate" />
                </div>
                <div className="col-md-2">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input {...register("price", { required: true, min: 0.1, pattern:/^\d+(\.\d{1,2})?$/})} type="number" onChange={(e)=>{enhanceOnchange(e, 'price')}} className={`form-control ${errors.price ? 'is-invalid':''}`} placeholder="0.00" id="price" />
                </div>
                
                <div className="col-md-2">
                    <label htmlFor="quanity" className="form-label">Quanity</label>
                    <input {...register("quantity", { required: true, min: 1, pattern: /^\d+$/})} type="number" onChange={(e)=>{enhanceOnchange(e, 'quantity')}} className={`form-control ${errors.quantity ? 'is-invalid':''}`} placeholder="0" id="quanity" />
                </div>

                <div className="col-md-2">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input {...register("amount", { required: true, min: 0.1, pattern:/^\d+(\.\d{1})?$/})} onChange={(e)=>{enhanceOnchange(e, 'amount')}} type="number" className={`form-control ${errors.amount ? 'is-invalid':''}`} placeholder="0" id="amount" />
                </div>
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary">Save record</button>
                </div>
            </form>
        </div>
    );
}
