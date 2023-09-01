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
        <section className="min-h-screen">
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
               <table className="min-w-full md:min-w-0 mt-4 bg-blue-200">
               <thead>
                 <tr>
                   <td className="w-1/3 md:w-full">
                     Category name
                   </td>
                   <td className="w-1/3 md:w-full border-l border-2-black">
                     Parent Category
                   </td>
                   <td className="w-1/3 md:w-full border-l border-2-black text-center">
                     Change
                   </td>
                 </tr>
               </thead>
               <tbody>
                 {categories.length > 0 && categories.map((category, index) => (
                   <tr key={index} className="bg-white">
                     <td className="pl-2 w-1/3 md:w-full">
                       {category.name}
                     </td>
                     <td className="text-center w-1/3 md:w-full">
                       {category?.parent?.name}
                     </td>
                     <td className="flex gap-2 py-2 px-1 flex-col md:flex-row w-1/3 md:w-full">
                       <button className="btn-primary" onClick={() => editCategory(category)}>
                         Edit
                         {/* SVG icon */}
                       </button>
                       <button className="btn-secondary" onClick={() => deleteCategories(category)}>
                         Delete
                         {/* SVG icon */}
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
             
            )}
        </section>
    )
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal}/>
));