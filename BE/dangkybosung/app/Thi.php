<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

class Thi extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'sotin' , 'tenhocphan', 'ky' , 'loai', 'diemlan1','nam' , 'id_sinh_vien', 'id_giao_vien', 'id_truong_khoa', 'ghichu', 'thoigian'
    ];
    protected $table = 'mega_dangky_thi';
}