<?php

namespace App\Http\Controllers;

use App\Acount;
use App\Http\Resources\AcountResource;
use Illuminate\Http\Request;

class AcountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Acount::all();
        return AcountResource::collection(Acount::all());
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
        // return $request;
    }

    /**
     * Display the specified resource.
     */
    // public function show(Acount $acount)
    // {
    //     // return AcountResource::make();
    //     // $show = Acount::find($acount);
    //     return new AcountResource($acount);

    // }
    public function show(Request $request)
    {
        $tk = $request->input('tk');
        $mk = $request->input('mk');

        // $li = hash('sha256', $mk);
        // $li = bcrypt($mk);
        
        $result = Acount::where(function ($query) use ($tk, $mk) {
            $query->where('tendangnhap', $tk)
                ->where('matkhau', $mk);
        })->get();

        return $result;
        // return new AcountResource($result);
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
    public function update(Request $request, string $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
