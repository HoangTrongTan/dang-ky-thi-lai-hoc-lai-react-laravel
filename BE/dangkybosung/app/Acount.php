<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

class Acount extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'matkhau' , 'nhom_id' , 'hodem', 'ten' , 'gioitinh', 'ngaysinh' , 'anh' , 'active' , 'quyen'
    ];
    protected $primaryKey = 'tendangnhap';
    protected $table = 'mega_acount';
}