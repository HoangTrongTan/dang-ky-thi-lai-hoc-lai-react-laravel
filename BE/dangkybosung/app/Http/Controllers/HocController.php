<?php

namespace App\Http\Controllers;

use App\Hoc;
use App\Http\Resources\HocResource;
use Illuminate\Http\Request;

class HocController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Hoc::all();
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
    public function store(Request $request)
    {
        $hoc =  Hoc::create($request->all());
        return HocResource::make($hoc);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $hoc = Hoc::where('id_sinh_vien', $id)->get();
        return $hoc;
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
    public function update(Request $request, Hoc $hoc)
    {
        $hoc -> update($request->all());
        return HocResource::make($hoc);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hoc $hoc)
    {
        return $hoc -> delete();
    }
}
