<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name_customer' => 'required|string|max:255',
            'phone_customer' => 'required|string|max:255',
            'adress_customer' => 'required|string|max:255',
            'email_customer' => 'required|string|max:255',
            'city_customer' => 'required|string|max:255'
        ];
    }
}