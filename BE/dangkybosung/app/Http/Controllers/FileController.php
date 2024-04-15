<?php

namespace App\Http\Controllers;

use App\FileDangKy;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function store(Request $request)
    {
        $file = $request->file('file');
        $idsinhvien = $request->input('id');
        if ($file) {
            $fileName = $file->getClientOriginalName();
            $file->move('uploads/', $fileName);
            // storeAs('app/',$fileName);

            $filedangky = new FileDangKy();
            $filedangky->file = $fileName;
            $filedangky->idsinhvien = $idsinhvien;
            $filedangky->save();
        }
        return $file;
    }
    public function destroy(string $id)
    {
        $fileDangKy = FileDangKy::find($id); // Tìm bản ghi cần xóa

        if ($fileDangKy) {
            $filePath = public_path('uploads/' . $fileDangKy->file);
            if (file_exists($filePath)) {
                unlink($filePath);
            }
            return $fileDangKy->delete();
        }
        return FileDangKy::destroy($id);
    }
    public function index()
    {
        return FileDangKy::all();
    }
    public function show(string $id)
    {
        $fileobj = FileDangKy::where('idsinhvien', $id)->get();
        return $fileobj;
    }
}
