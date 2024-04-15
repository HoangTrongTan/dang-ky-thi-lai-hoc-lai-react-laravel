<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AcountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'tendangnhap' => $this->tendangnhap,
            'matkhau' => $this->matkhau,
            'nhom_id' => $this->nhom_id,
            'hodem' => $this->hodem,
            'ten' => $this->ten,
            'gioitinh' => $this->gioitinh,
            'ngaysinh' => $this->ngaysinh,
            'anh' => $this->anh,
            'active' => $this->active,
            'quyen' => $this->quyen,
        ];
    }
}
