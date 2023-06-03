import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Dropdown from "@/Components/Dropdown.jsx";

export default function Index({ auth, products }) {
    const { data, setData, post, patch, processing, reset, errors } = useForm({
        description: '',
        name: '',
        asking_price: '',
    });

    const [editingProductId, setEditingProductId] = useState(null);

    // Handle form submission for creating a new product
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'), { onSuccess: () => reset() });
    };

    // Handle click event for the Edit button
    const handleEditClick = (productId) => {
        const productToEdit = products.find(product => product.id === productId);

        if (productToEdit) {
            setData({
                name: productToEdit.name,
                description: productToEdit.description,
                asking_price: productToEdit.asking_price,
            });
            setEditingProductId(productId);
        }
    };

    // Handle form submission for updating a product
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.products.update', editingProductId), { onSuccess: () => reset() });
        setEditingProductId(null);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
                <div className="container mx-auto">
                    <table className="table-auto w-full">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Asking</th>
                            <th className="px-4 py-2">Highest</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">
                                    {editingProductId === product.id ?
                                        <TextInput
                                            name="name"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            placeholder="Name"
                                        />
                                     :
                                        product.name
                                    }
                                </td>
                                <td className="border px-4 py-2">
                                    {editingProductId === product.id ?
                                        <TextInput
                                            name="description"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            placeholder="Description"
                                        />
                                     :
                                        product.description
                                    }
                                </td>
                                <td className="border px-4 py-2">{product.asking_price}</td>
                                <td className="border px-4 py-2">{product.highest_bid}</td>
                                <td className="border px-4 py-2">
                                    {editingProductId === product.id ?
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={handleUpdateSubmit}
                                            disabled={processing}
                                        >
                                            Submit
                                        </button>
                                        :
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleEditClick(product.id)}
                                            disabled={processing}
                                        >
                                            Edit
                                        </button>
                                    }
                                    <Dropdown.Link
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        as="button" href={route('products.destroy', product.id)} method="delete">
                                        Delete
                                    </Dropdown.Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            name="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="Name"
                        />
                        <InputError message={errors.name} />

                        <TextInput
                            name="description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            placeholder="Description"
                        />
                        <InputError message={errors.description} />

                        <TextInput
                            name="asking_price"
                            value={data.asking_price}
                            onChange={e => setData('asking_price', e.target.value)}
                            placeholder="Asking Price"
                        />
                        <InputError message={errors.asking_price} />

                        <PrimaryButton className="ml-2 mt-2" type="submit">Create</PrimaryButton>
                    </form>
                </div>
        </AuthenticatedLayout>
    );
};
