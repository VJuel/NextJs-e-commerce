import { z } from 'zod';

export const PayementSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
        invalid_type_error: "Name must be a string"
    }).min(1, {message: 'Name must be at least 1 characters'}),
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: "Email must be a string"
    }).email(),
    city: z.string({
        required_error: 'City is required',
        invalid_type_error: "City must be a string"
    }).min(1, {message: 'City must be at least 1 characters'}),
    codePostal: z.string({
        required_error: 'Code Postal is required',
        invalid_type_error: "Code Postal must be a number"
    }).min(1, {message: 'Code Postal must be at least 1 characters'}),
    streetAdress: z.string({
        required_error: 'StreetAdress is required',
        invalid_type_error: "StreetAdress must be a string"
    }).min(1, {message: 'StreetAdress must be at least 1 characters'}),
    country: z.string({
        required_error: 'Country is required',
        invalid_type_error: "Country must be a string"
    }).min(1, {message: 'Country must be at least 1 characters'}),
});
