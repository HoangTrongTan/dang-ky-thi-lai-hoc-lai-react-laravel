<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerCollection;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Customer::all();
        // return TaskResource::collection(Customer::all());
        return new CustomerCollection(Customer::paginate(10));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $customer = Customer::create($request->validated());
        return TaskResource::make($customer);
        // Customer::create($request);

    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        // return TaskResource::make()
        // return Customer::find($customer);
        return new TaskResource($customer);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,Customer $customer)
    {
        $customer ->update($request->all());
        return new TaskResource($customer);
        // return TaskResource::make($custome);
        // $validatedData = $request->validated();
        // $custome->update($validatedData);
        // return new TaskResource($custome);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer -> delete();
    }
}
