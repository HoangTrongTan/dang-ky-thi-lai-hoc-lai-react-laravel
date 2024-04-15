<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreThiRequest extends FormRequest
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
    public function rules() : array
    {
        return [
            'sotin' => 'required|int',
            'tenhocphan' => 'required|string|max:255',
            'ky' => 'required|int',
            'loai' => 'required|int',
            'diemlan1' => 'required',
            'fileupload' => 'required',
            'id_sinh_vien' => 'required|string|max:255',
            'id_giao_vien' => 'required|string|max:255',
            'id_truong_khoa' => 'required|string|max:255',
            'ghichu' => 'required|string|max:255',
            'thoigian' => 'nullable'
        ];
    }
}
