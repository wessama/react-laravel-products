import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import Product from "@/Components/Product.jsx";
import TextInput from "@/Components/TextInput";

export default function Index({ auth, products }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        description: '',
        name: '',
        asking_price: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('products.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Products" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="mt-1 block w-full"
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                    <textarea
                        value={data.message}
                        placeholder="Description"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-2"
                        onChange={e => setData('description', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <TextInput
                        id="asking_price"
                        type="text"
                        name="asking_price"
                        placeholder="Price"
                        className="mt-1 block w-full mt-2"
                        onChange={(e) => setData('asking_price', e.target.value)}
                    />
                    <InputError message={errors.asking_price} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Post</PrimaryButton>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {products.map(product =>
                        <Product key={product.id} product={product} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
