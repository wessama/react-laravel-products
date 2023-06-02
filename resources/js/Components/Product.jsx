import React, { useState } from 'react';
import { useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm, usePage } from '@inertiajs/react';
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel.jsx";
import Echo from 'laravel-echo';

dayjs.extend(relativeTime);

export default function Product({ product }) {
    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    const [highestBid, setHighestBid] = useState(product.highest_bid);

    const { data, setData, post, patch, clearErrors, reset, errors } = useForm({
        name: product.name,
        description: product.description,
        asking_price: product.asking_price,
        value: '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('products.update', product.id), { onSuccess: () => setEditing(false) });
    };

    const submitBid = (e) => {
        e.preventDefault();
        post(route('bids.store', { product: product.id }), {
            onSuccess: (page) => {
                const { highestBid } = page.props;
                setHighestBid(highestBid);
                reset();
            },
        });
    };

    useEffect(() => {
        const channel = window.Echo.channel('product.' + product.id);

        channel.listen('.bid.updated', (event) => {
            setHighestBid(event.highestBid);
        });

        return () => {
            channel.stopListening('.bid.updated');
        };
    }, [product]);

    return (
        <div className="p-6 flex space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-800">{product.user.name}</span>
                        <small className="ml-2 text-sm text-gray-600">{dayjs(product.created_at).fromNow()}</small>
                        <small className="ml-2 text-sm text-gray-600">&middot; ${highestBid}</small>
                        { product.created_at !== product.updated_at && <small className="text-sm text-gray-600"> &middot; edited {dayjs(product.updated_at).fromNow()}</small>}
                    </div>
                    {product.user.id === auth.user.id &&
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                    Edit
                                </button>
                                <Dropdown.Link as="button" href={route('products.destroy', product.id)} method="delete">
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    }
                </div>
                {editing
                    ? <form onSubmit={submit}>
                        <InputLabel htmlFor="description" value="Description" />
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                        <InputError message={errors.description} className="mt-2" />

                        <InputLabel htmlFor="name" value="Name" className="mt-2" />
                        <TextInput value={data.name} onChange={e => setData('name', e.target.value)} className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></TextInput>
                        <InputError message={errors.name} className="mt-2" />

                        <InputLabel htmlFor="asking_price" value="Asking Price" className="mt-2" />
                        <TextInput value={data.asking_price} onChange={e => setData('asking_price', e.target.value)} className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></TextInput>
                        <InputError message={errors.asking_price} className="mt-2" />

                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>
                        </div>
                    </form>
                    :
                    <div>
                        <InputLabel htmlFor="name" value="Name" className="mt-2" />
                        <p className="mt-4 text-lg text-gray-900">{product.description}</p>

                        <InputLabel htmlFor="description" value="Description" className="mt-2" />
                        <p className="mt-4 text-lg text-gray-900 mt-2">{product.name}</p>

                        <InputLabel htmlFor="asking_price" value="Asking Price" className="mt-2" />
                        <p className="mt-4 text-lg text-gray-900 mt-2">{product.asking_price}</p>

                        {product.user.id !== auth.user.id &&
                            <form onSubmit={submitBid}>
                                <InputLabel htmlFor="your_bid" value="Your bid" className="mt-2"/>
                                <div className="mb-3 mt-2 pt-0">
                                    <TextInput type="text"
                                               placeholder="Bid"
                                               name="value"
                                               value={data.value}
                                               onChange={e => setData('value', e.target.value)}
                                               className="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
                                    <InputError message={errors.value} className="mt-2" />
                                    <PrimaryButton className="mt-4">Bid</PrimaryButton>
                                </div>
                            </form>
                        }
                    </div>
                }
            </div>
        </div>
    );
}
