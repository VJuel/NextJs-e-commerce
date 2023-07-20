'use client'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {withSwal} from 'react-sweetalert2';

function Categories({swal}) {
    const [editedCategory, setEditedCategory] = useState(null)
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [propreties, setPropreties] = useState([])
    const [parentCategory, setParentCategory] = useState('')

    useEffect(() => {
        fetchCategories()
    }, [])

    async function fetchCategories() {
        await axios.get('/api/categories', { next: { revalidate: 10 } }).then(result => {
            setCategories(result.data)
        })
    }

    function addPropreties() {
        setPropreties((prev) => {
            return [...prev, {name: '', values: ''}]
        })
    }

    function handlePropretyNameChange(index, proprety, newName) {
        setPropreties(prev => {
            const propreties = [...prev];
            propreties[index].name = newName
            return propreties
        })
    }

    function handlePropretyValueChange(index, proprety, newValues) {
        setPropreties(prev => {
            const propreties = [...prev];
            propreties[index].values = newValues
            return propreties
        })
    }


    async function removeProprety(indexToRemove) {
        await setPropreties(prev => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove
            })
        })

    }

    async function saveCategory(ev) {
        ev.preventDefault()
        const data = {
            name, parentCategory, propreties: propreties.map(el => ({
                name: el.name,
                values: el.values.split(',')
            })),
        }
        if (editedCategory) {
            data._id = editedCategory._id
            await axios.put('/api/categories', data);
            setEditedCategory(null)
        } else {
            await axios.post('/api/categories', data);
        }
        await setName('')
        setParentCategory('')
        setPropreties([])
        await fetchCategories()
    }


    //TODO value propreties array ?
    function editCategory(category) {
        setEditedCategory(category)
        setName(category.name)
        setParentCategory(category?.parent?._id)
        setPropreties(category?.propreties?.map(({name, values}) => ({
                name,
                // values: value.join(",") || undefined
                values: values.join(",")
            }))
        )
        fetchCategories()
    }

    function deleteCategories(category) {
        swal.fire({
            title: `Are you sure?`,
            text: `Do you want to delete ${category.name}`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete',
            confirmButtonColor: '#d55'
        }).then(async result => {
            if (result.isConfirmed) {
                const {_id} = category;
                await axios.delete(`/api/categories/${_id}`)
                fetchCategories()
            }
        }).catch(error => {
            console.log(error)
        });

    }

    return (
        <section>
            <h1 className="title-dashboard mb-2">Categories</h1>
            <label>{editedCategory ? `Edit category ${editedCategory.name}` : 'New categories name'}</label>
            <form onSubmit={saveCategory} className="flex gap-2 w-full">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 flex-wrap md:flex-nowrap">
                        <input className="flex-grow-0 md:flex-grow" type="text" placeholder="Categories name"
                               onChange={ev => setName(ev.target.value)} value={name}/>
                        <select onChange={ev => setParentCategory(ev.target.value)} value={parentCategory}>
                            <option value="">No parent category</option>
                            {categories.length > 0 && categories.map((category, index) =>
                                (<option value={category._id} key={index} className="w-1/2">{category.name}</option>
                                ))}
                        </select>
                    </div>
                    <label htmlFor="">Propreties</label>
                    <button
                        className="btn-default"
                        onClick={addPropreties}
                        type="button"
                    >
                        Add propreties
                    </button>
                    {propreties.length > 0 && propreties.map((el, index) => (
                        <div className="flex gap-1 flex-wrap md:flex-nowrap" key={index}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={el.name}
                                onChange={ev => handlePropretyNameChange(index, el, ev.target.value)}
                            />
                            <input
                                type="text"
                                value={el.values}
                                placeholder="Value"
                                onChange={ev => handlePropretyValueChange(index, el, ev.target.value)}
                            />
                            <button
                                className="btn-default !bg-red-400"
                                onClick={() => removeProprety(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    {editedCategory && (
                        <div className="flex gap-1 mt-2">
                            <button className="btn-default"
                                    type="button"
                                    onClick={() => {
                                        setEditedCategory(null)
                                        setName('')
                                        setParentCategory('')
                                        setPropreties([])
                                    }}>
                                Cancel
                            </button>
                        </div>
                    )}
                    <button type="submit"
                            className="!py-1 px-2 btn-primary w-[20%] text-center justify-center">
                        Save
                    </button>
                </div>
            </form>
            {!editedCategory && (
                <table className="basic mt-4 bg-blue-200 table-caption md:table">
                    <thead>
                    <tr>
                        <td className="w-full">
                            Category name
                        </td>
                        <td className="w-full border-l border-2-black flex-grow whitespace-nowrap">
                            Parent Category
                        </td>
                        <td className="w-full border-l border-2-black flex-grow whitespace-nowrap text-center">
                            Change
                        </td>
                    </tr>
                    </thead>
                    <tbody className="basic">
                    {categories.length > 0 && categories.map((category, index) =>
                        (<tr key={index} className="bg-white">
                                <td className={"w-[40%] pl-2"}>
                                    {category.name}
                                </td>
                                <td className="text-center">
                                    {category?.parent?.name}
                                </td>
                                <td className="flex gap-2 py-2 px-1 flex-col md:flex-row">
                                    <button className="btn-primary"
                                            onClick={() => editCategory(category)}>
                                        Edit
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                        </svg>
                                    </button>
                                    <button className="btn-secondary"
                                            onClick={() => deleteCategories(category)}>
                                        Delete
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            )}
        </section>
    )
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal}/>
));