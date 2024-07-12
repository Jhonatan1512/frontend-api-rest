import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, { loader as productsLoader, action as actionUpdateAvailability} from './views/Products'
import NewProduct, { action as newProductAction} from './views/NewProduct'
import EdiProduct, { loader as editProductLoader, action as editProductAction} from './views/EditProduct'
import { action as deleteProductAction} from './components/ProductDetails'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products/>,
                loader: productsLoader,
                action: actionUpdateAvailability
            },
            {
                path:'products/new',
                element: <NewProduct/>,
                action: newProductAction
            },
            {
                path:'product/:id/edit',
                element:<EdiProduct/>,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path:'product/:id/delete',
                action: deleteProductAction
            }
        ]
    }
])