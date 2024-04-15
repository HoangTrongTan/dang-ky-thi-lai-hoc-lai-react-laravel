<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id_customer' => $this->id_customer,
            'name_customer' => $this->name_customer,
            'phone_customer' => $this->phone_customer,
            'adress_customer' => $this->adress_customer,
            'email_customer' => $this->email_customer,
            'city_customer' => $this->city_customer,
        ];
    }
}
