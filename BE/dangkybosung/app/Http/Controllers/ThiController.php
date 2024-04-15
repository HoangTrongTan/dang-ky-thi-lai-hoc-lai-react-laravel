<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreThiRequest;
use App\Http\Resources\ThiResource;
use App\Thi;
use Illuminate\Http\Request;

class ThiController extends Controller
{
    public function update(Request $request, Thi $thi)
    {
        $file = $request->file('file');
        $id = $request->input('id');
        if ($file) {
            $fileName = $file->getClientOriginalName();
            $file->move('uploads/', $fileName);
            // storeAs('app/',$fileName);

            $thi = Thi::where('id', $id)->first();
            $thi->file = $fileName;
            return $thi->update();
        }
        
        $thi -> update($request -> all());
        return ThiResource::make($thi);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Thi::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    public function store(Request $request)
    {
        $thi = Thi::create($request->all());
        return ThiResource::make($thi);
    }
    // public function store(Request $request)
    // {
    //     $sotin = $request->input('sotin');
    //     $tenhocphan = $request->input('tenhocphan');
    //     $ky = $request->input('ky');
    //     $loai = $request->input('loai');
    //     $diemlan1 = $request->input('diemlan1');
    //     $nam = $request->input('nam');
    //     $file = $request->file('file');
    //     $id_sinh_vien = $request->input('id_sinh_vien');
    //     $filedangky = new Thi();
    //     if ($file) {
    //         $fileName = $file->getClientOriginalName();
    //         $file->move('uploads/', $fileName);
    //         // storeAs('app/',$fileName);

    //         $filedangky->sotin = $sotin;
    //         $filedangky->tenhocphan = $tenhocphan;
    //         $filedangky->ky = $ky;
    //         $filedangky->loai = $loai;
    //         $filedangky->diemlan1 = $diemlan1;
    //         $filedangky->nam = $nam;
    //         $filedangky->file = $fileName;
    //         $filedangky->id_sinh_vien = $id_sinh_vien;
    //         $filedangky->save();
    //     }
    //     return ThiResource::make($filedangky);
    // }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $thi = Thi::where('id_sinh_vien', $id)->get();
       
        return $thi;
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( Thi $thi)
    {
        return $thi -> delete();
    }
}
