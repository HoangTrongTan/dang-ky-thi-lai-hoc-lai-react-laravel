<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

class HoSo extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'tendangnhap' , 'dienthoai', 'email' , 'dantoc', 'tongiao','cccd' , 'ngaycap', 'noicap', 'quequan', 'hokhau', 'diachi', 'choo', 'ngayvaodoan', 'ngayvaodang', 'hotenbo', 'dienthoaibo', 'hotenme', 'namsinhme', 'dienthoaime', 'doituong', 'ghichu', 'nguoicapnhat', 'thoigiancapnhat'
    ];
    protected $table = 'mega_acount_hoso';
}