
import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher} from 'react-router-dom'
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from '../services/ProductService'

type ProductDetailsProps = {
    product: Product
}
// eslint-disable-next-line react-refresh/only-export-components
export async function action({params} : ActionFunctionArgs) {
    if(params.id){
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({product}: ProductDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailability = product.availability

  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method='POST'>
                <button
                    type='submit'
                    name='id'
                    value={product.id}
                    className={`${isAvailability ? 'text-black' : 'text-red-600'}
                    rounded-lg p-2 text-xs uppercase font-bold w-full hover:cursor-pointer`}
                >
                    {isAvailability ? 'Disponible' : 'No disponible'}
                </button>
            </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           <div className=" flex gap-2 items-center">
            <button
                onClick={() => navigate(`product/${product.id}/edit`)}
                className=' bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
            >Editar</button>
            <Form
                className=' w-full'
                method='POST'
                action={`product/${product.id}/delete`}
                onSubmit={(e) => {
                    if(!confirm('¿Estas seguro que desas eliminar?')){
                        e.preventDefault()
                    }
                }}
            >
                <input 
                    type="submit"
                    value='Eliminar'
                    className=' bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'                
                />
            </Form>
           </div>
        </td>
    </tr>
  )
}
